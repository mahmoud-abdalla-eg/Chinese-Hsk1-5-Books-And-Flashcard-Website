import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader

sys.stdout.reconfigure(encoding="utf-8")

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PROJECT_ROOT.parent

HSK_DATA_DIR = PROJECT_ROOT / "source-data" / "hsk"
EXTRACTED_DIR = PROJECT_ROOT / "source-data" / "extracted"
GRAMMAR_DIR = PROJECT_ROOT / "source-data" / "grammar"

BOOK_SOURCES = [
    {
        "level": 1,
        "kind": "bracket-vocabulary",
        "path": SOURCE_ROOT / "hsk 1" / "hsk-1-word-list-(my-hsk.com).pdf",
    },
    {
        "level": 2,
        "kind": "bracket-vocabulary",
        "path": SOURCE_ROOT / "hsk 2" / "vocabulary_hsk2.pdf",
    },
    {
        "level": 3,
        "kind": "studyblog-hsk3-examples",
        "path": SOURCE_ROOT
        / "hsk 3"
        / "vocabs list"
        / "hsk-3-vocabulary-list-v2-(studyblog.org).pdf",
    },
    {
        "level": 4,
        "kind": "bracket-vocabulary",
        "path": SOURCE_ROOT
        / "hsk 4"
        / "hsk-4-vocabulary-list-(studyblog.org).pdf",
    },
    {
        "level": 5,
        "kind": "word-list",
        "path": SOURCE_ROOT / "hsk 5" / "HSK-5-Vocabularyagain.pdf",
    },
]

GRAMMAR_SOURCE = SOURCE_ROOT / "HSK 1-6 Grammar.pdf"

KANGXI_TO_CJK = str.maketrans(
    {
        "⼀": "一",
        "⼆": "二",
        "⼈": "人",
        "⼉": "儿",
        "⼋": "八",
        "⼊": "入",
        "⼗": "十",
        "⼏": "几",
        "⼝": "口",
        "⼤": "大",
        "⼥": "女",
        "⼦": "子",
        "⼩": "小",
        "⼯": "工",
        "⼼": "心",
        "⼿": "手",
        "⽂": "文",
        "⽅": "方",
        "⽇": "日",
        "⽉": "月",
        "⽊": "木",
        "⽔": "水",
        "⽕": "火",
        "⽣": "生",
        "⽤": "用",
        "⽬": "目",
        "⽼": "老",
        "⽽": "而",
        "⾏": "行",
        "⾐": "衣",
        "⾥": "里",
        "⻅": "见",
        "⻋": "车",
        "⻔": "门",
    }
)

POS_ALIASES = {
    "adj": "adjective",
    "adv": "adverb",
    "aux": "auxiliary verb",
    "conj": "conjunction",
    "n": "noun",
    "nm": "measure word",
    "num": "number",
    "prep": "preposition",
    "pron": "pronoun",
    "sa": "structural auxiliary",
    "v": "verb",
}

POS_RE = re.compile(
    r"\b(nm|sa|aux|adj|adv|conj|prep|pron|num|n|v)\.",
    re.IGNORECASE,
)

CJK_RE = re.compile(r"[\u3400-\u9fff]")
ENTRY_RE = re.compile(
    r"(?:^|\n)\s*(\d+)\s+【([^】]+)】\s*(.*?)(?=(?:\n\s*\d+\s+【)|\Z)",
    re.DOTALL,
)


def read_pdf_text(path):
    reader = PdfReader(str(path))
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def clean_spaces(value):
    return re.sub(r"\s+", " ", value).strip()


def clean_example(value, word):
    value = clean_spaces(value)
    value = value.replace("～", word).replace("~", word)
    value = value.replace(" .", ".").replace(" ?", "?")
    return value


def extract_chinese_examples(entry_text, word):
    examples = []
    for raw_line in entry_text.splitlines():
        line = clean_spaces(raw_line)
        if not CJK_RE.search(line):
            continue
        if "【" in line or "www." in line or "my-hsk.com" in line:
            continue
        matches = re.findall(
            r"(?:[甲乙丙丁][：:])?[\u3400-\u9fff][\u3400-\u9fff0-9A-Za-z，、：:；;？！?。～~（）()《》“”‘’\s]*[。？！?]",
            line,
        )
        for match in matches:
            example = clean_example(match, word)
            if example and example not in examples:
                examples.append(example)
    return examples


def parse_bracket_vocabulary(source):
    text = read_pdf_text(source["path"])
    rows = []
    for match in ENTRY_RE.finditer(text):
        number = int(match.group(1))
        word = clean_spaces(match.group(2))
        body = match.group(3)
        first_line = clean_spaces(body.splitlines()[0] if body.splitlines() else body)
        pos_match = POS_RE.search(body)
        pinyin = clean_spaces(first_line[: pos_match.start()]) if pos_match else ""
        part_of_speech = (
            POS_ALIASES.get(pos_match.group(1).lower(), pos_match.group(1).lower())
            if pos_match
            else ""
        )
        examples = extract_chinese_examples(body, word)
        rows.append(
            {
                "sourceLevel": source["level"],
                "source": str(source["path"].relative_to(SOURCE_ROOT)),
                "sourceOrder": number,
                "hanzi": word,
                "pinyin": pinyin,
                "partOfSpeech": part_of_speech,
                "examples": [{"hanzi": example} for example in examples],
            }
        )
    return rows


def parse_word_list(source):
    text = read_pdf_text(source["path"])
    rows = []
    for line in text.splitlines():
        line = clean_spaces(line)
        match = re.match(
            r"^(\d+)\s+([\u3400-\u9fff]+)\s+([A-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ\s]+?)\s+(.+)$",
            line,
        )
        if not match:
            continue
        rows.append(
            {
                "sourceLevel": source["level"],
                "source": str(source["path"].relative_to(SOURCE_ROOT)),
                "sourceOrder": int(match.group(1)),
                "hanzi": match.group(2),
                "pinyin": clean_spaces(match.group(3)),
                "meaning": {"en": clean_spaces(match.group(4))},
                "examples": [],
            }
        )
    return rows


def sentence_after(text, start):
    tail = text[start:]
    match = re.match(r"\s*([^。？！?.]+[。？！?.])", tail, re.DOTALL)
    return clean_spaces(match.group(1)) if match else ""


def sentence_parts(text):
    return [
        clean_spaces(match)
        for match in re.findall(r"\s*([^。？！?.]+[。？！?.])", text, re.DOTALL)
        if clean_spaces(match)
    ]


def cjk_count(value):
    return len(CJK_RE.findall(value))


def parse_studyblog_hsk3(source, current_words):
    text = read_pdf_text(source["path"])
    text = re.sub(r"Chinese Word Pinyin Part Definition.*?English", "", text)
    anchors = []
    for word in current_words:
        match = re.search(r"(?m)^" + re.escape(word["hanzi"]) + r"\s+", text)
        if match:
            anchors.append((match.start(), word["hanzi"]))
    anchors.sort()

    rows = []
    for index, (start, hanzi) in enumerate(anchors):
        end = anchors[index + 1][0] if index + 1 < len(anchors) else len(text)
        segment = text[start:end]
        header = clean_spaces(segment.splitlines()[0])
        header_match = re.match(
            r"^([\u3400-\u9fff…]+)\s+([A-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ\s]+?)\s+(Noun|Verb|Adj|Adv|Prep|Phrase|Verb Object|Conj)\b",
            header,
            re.IGNORECASE,
        )
        pinyin = clean_spaces(header_match.group(2)) if header_match else ""
        part_of_speech = header_match.group(3).lower() if header_match else ""

        example_match = re.search(
            r"([\u3400-\u9fff][\u3400-\u9fff0-9A-Za-z，、：:；;？！?。～~（）()《》“”‘’\s]*[。？！?])",
            segment,
        )
        examples = []
        if example_match:
            hanzi_example = clean_example(example_match.group(1), hanzi)
            pinyin_example = sentence_after(segment, example_match.end())
            english_example = sentence_after(segment, example_match.end() + len(pinyin_example))
            examples.append(
                {
                    "hanzi": hanzi_example,
                    "pinyin": pinyin_example,
                    "en": english_example,
                }
            )

        rows.append(
            {
                "sourceLevel": source["level"],
                "source": str(source["path"].relative_to(SOURCE_ROOT)),
                "hanzi": hanzi,
                "pinyin": pinyin,
                "partOfSpeech": part_of_speech,
                "examples": examples,
            }
        )
    return rows


def load_hsk(level):
    path = HSK_DATA_DIR / f"hsk-{level}.json"
    return json.loads(path.read_text(encoding="utf-8"))


def write_hsk(level, words):
    path = HSK_DATA_DIR / f"hsk-{level}.json"
    path.write_text(
        json.dumps(words, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def merge_examples(extracted_rows):
    rows_by_hanzi = {}
    for row in extracted_rows:
        rows_by_hanzi.setdefault(row["hanzi"], []).append(row)

    report = {}
    for level in range(1, 6):
        words = load_hsk(level)
        updated_examples = 0
        matched_source_rows = 0
        for word in words:
            matches = rows_by_hanzi.get(word["hanzi"], [])
            if matches:
                matched_source_rows += 1
            examples = []
            sources = []
            for row in matches:
                for example in row.get("examples", []):
                    if example.get("hanzi") and example["hanzi"] not in {
                        item["hanzi"] for item in examples
                    }:
                        examples.append(
                            {
                                "hanzi": example.get("hanzi", ""),
                                "pinyin": example.get("pinyin", ""),
                                "en": example.get("en", ""),
                                "ar": "",
                            }
                        )
                sources.append(row["source"])

            if examples:
                if not word.get("example", {}).get("hanzi"):
                    word["example"] = examples[0]
                    updated_examples += 1
                word["examples"] = examples[:3]
                word["exampleSource"] = sorted(set(sources))

            part = word.get("partOfSpeech", "")
            if part in ("", "unknown"):
                sourced_part = next(
                    (
                        row.get("partOfSpeech")
                        for row in matches
                        if row.get("partOfSpeech")
                    ),
                    "",
                )
                if sourced_part:
                    word["partOfSpeech"] = sourced_part

        write_hsk(level, words)
        report[level] = {
            "words": len(words),
            "matchedSourceRows": matched_source_rows,
            "examplesAddedThisRun": updated_examples,
            "wordsWithExamples": sum(1 for word in words if word.get("example", {}).get("hanzi")),
            "exampleRowsMerged": sum(len(word.get("examples", [])) for word in words),
        }
    return report


def parse_grammar_path():
    text = read_pdf_text(GRAMMAR_SOURCE).translate(KANGXI_TO_CJK)
    row_re = re.compile(
        r"(?:^|\n)([1-6])([1-6]\.\d{2}\.\d)Lesson",
        re.MULTILINE,
    )
    starts = [
        (match.start(), match.end(), match.group(1), match.group(2))
        for match in row_re.finditer(text)
    ]
    items = []
    for index, (start, content_start, level, lesson_code) in enumerate(starts):
        end = starts[index + 1][0] if index + 1 < len(starts) else len(text)
        raw = clean_spaces(text[content_start:end])

        candidate_matches = list(
            re.finditer(
                r"([\u3400-\u9fff0-9][\u3400-\u9fff#A-Z0-9，、：:；;？！?。／～~（）()《》“”‘’\s]+[。？！?])",
                raw,
            )
        )
        example_match = next(
            (
                match
                for match in candidate_matches
                if cjk_count(match.group(1)) >= 2
            ),
            candidate_matches[0] if candidate_matches else None,
        )
        example_hanzi = clean_spaces(example_match.group(1)) if example_match else ""
        before_example = clean_spaces(raw[: example_match.start()]) if example_match else raw
        after_example = raw[example_match.end() :] if example_match else ""
        after_parts = sentence_parts(after_example)
        example_pinyin = after_parts[0] if after_parts else ""
        example_en = after_parts[1] if len(after_parts) > 1 else ""

        items.append(
            {
                "id": f"hsk-{level}-{lesson_code}",
                "hskLevel": int(level),
                "lessonCode": lesson_code,
                "pattern": before_example,
                "example": {
                    "hanzi": example_hanzi,
                    "pinyin": example_pinyin,
                    "en": example_en,
                    "ar": "",
                },
                "source": str(GRAMMAR_SOURCE.relative_to(SOURCE_ROOT)),
            }
        )
    return items


def main():
    EXTRACTED_DIR.mkdir(parents=True, exist_ok=True)
    GRAMMAR_DIR.mkdir(parents=True, exist_ok=True)

    all_rows = []
    hsk3_words = load_hsk(3)
    for source in BOOK_SOURCES:
        if source["kind"] == "bracket-vocabulary":
            rows = parse_bracket_vocabulary(source)
        elif source["kind"] == "studyblog-hsk3-examples":
            rows = parse_studyblog_hsk3(source, hsk3_words)
        else:
            rows = parse_word_list(source)
        print(f"{source['kind']}: {len(rows)} rows from {source['path'].name}")
        all_rows.extend(rows)

    vocabulary_file = EXTRACTED_DIR / "book-vocabulary.json"
    vocabulary_file.write_text(
        json.dumps(all_rows, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    grammar_items = parse_grammar_path()
    grammar_file = GRAMMAR_DIR / "learning-path.json"
    grammar_file.write_text(
        json.dumps(grammar_items, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    merge_report = merge_examples(all_rows)
    report = {
        "sourcesRoot": str(SOURCE_ROOT),
        "vocabularyRowsExtracted": len(all_rows),
        "grammarItemsExtracted": len(grammar_items),
        "merge": merge_report,
        "notes": [
            "Only examples present in the local source PDFs were merged.",
            "Arabic translations and audio paths remain blank unless real data exists.",
            "HSK 5 MandarinBean vocabulary source has no example sentences, so it was extracted for reference but not used to invent examples.",
        ],
    }
    report_file = EXTRACTED_DIR / "extraction-report.json"
    report_file.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
