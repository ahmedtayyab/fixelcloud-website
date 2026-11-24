const PRODUCT_SLUGS = new Set(["finhub", "salesportal", "ai-messaging-solutions"]);

/*
  The product pages were scraped with their live app previews, so the text includes
  dashboard labels, sample rows and the same section twice. Keep the published copy.
*/
export function preparePageBlocks(slug: string, blocks: string[]) {
  if (!PRODUCT_SLUGS.has(slug)) return blocks;
  const filtered = blocks.filter((line) => !isAppChrome(line));
  const joined = joinTitleFragments(filtered.map((line) => line.replace(/^##H1\b/, "##H2")));
  return dedupeSections(splitNumberedAnswers(joined));
}

const NAV = new Set([
  "overview",
  "insights",
  "projects",
  "transactions",
  "expenses",
  "pending 2",
  "impact fund",
  "dashboard",
  "all leads",
  "interview pipeline",
  "project life",
  "applications",
  "recruitment",
  "c2c / b2b / 1099",
  "market",
  "job alerts",
  "hiring trends",
  "admin",
  "finance",
  "users",
]);

function isAppChrome(line: string) {
  const text = line.replace(/^##H\d\s*/, "").replace(/^[-–]\s*/, "").trim();
  if (!text) return false;
  if (!line.startsWith("##H") && NAV.has(text.toLowerCase())) return true;
  if (/^(\S+)\s+\1\b/i.test(text)) return true;
  if (/^M T W T F S S\b/.test(text)) return true;
  if ((text.match(/\$/g) || []).length >= 2 && !text.includes("?")) return true;
  if (/^[A-Z] (FinHub|SalesPortal)$/.test(text)) return true;
  if (/\.fixelcloud\.co\b/i.test(text) && !text.includes("?")) return true;
  if (/LinkedIn Today|min ago|h ago|Job Applied LinkedIn/.test(text)) return true;
  if (/^(Nov|Dec|Jan) \d{1,2}$/.test(text) || /^Available \$/.test(text)) return true;
  if (!text.includes("?") && /^(Amount|Brokerage,|Additional charges|Impact Fund,|Total \(net)|^(Gross Revenue|Total Deductions|Total Expense|Available Amount|Annual project|Net per payout|Net \d|Broker Date|Pending Approved|Deposit \+|Charges |5 steps|1 New project|2 Generate|Broker [A-Z]|Date Category|Income PKR|Expenses PKR|Net this month|Import Excel|Generate \(|This month |Overview |Transactions |Insights |Impact Fund |Dashboard |Job Applied \d|Hiring pipeline|Leads by profile|Latest updates|Summary Transactions|Period Nov|Project Name |Broker Project|Total leads|In interviews|Onboarding \d|Projects live|Interview \d|RTR |Project Started |NB Profile|KT Profile|LS Profile|OT Other)/.test(text)) {
    return true;
  }
  if (/^\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/.test(text)) return true;
  if (text.length > 240 && !/[.!?]\s/.test(text) && !text.includes("?")) return true;
  return false;
}

function joinTitleFragments(lines: string[]) {
  const out: string[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    let line = lines[index];
    if (line.startsWith("##H")) {
      while (index + 1 < lines.length) {
        const next = lines[index + 1];
        const words = next.trim().split(/\s+/);
        const headingText = line.replace(/^##H\d\s*/, "");
        if (next.startsWith("##H") || next.startsWith("-") || next.startsWith("//") || words.length > 4 || next.length > 28) break;
        if (/^(book |sign in|get |explore |talk to|contact |ask for|our services)/i.test(next)) break;
        if (/[.!?]$/.test(headingText) && words.length > 2) break;
        line = `${line} ${next}`.replace(/\s+/g, " ");
        index += 1;
      }
    } else if (out[out.length - 1] === line) {
      continue;
    }
    out.push(line);
  }
  return out;
}

function splitNumberedAnswers(lines: string[]) {
  const out: string[] = [];
  for (const line of lines) {
    const match = line.match(/^\d{2}\s+(.+?\?)\s+(.+)$/);
    if (match && !line.startsWith("##H")) {
      out.push(`##H3 ${match[1]}`);
      out.push(match[2]);
      continue;
    }
    out.push(line);
  }
  return out;
}

function dedupeSections(lines: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  let skipping = false;
  for (const line of lines) {
    const heading = line.match(/^##H[1-6]\s+(.+)$/);
    if (heading) {
      const key = heading[1].toLowerCase().replace(/[^a-z0-9]+/g, "");
      if (seen.has(key)) {
        skipping = true;
        continue;
      }
      seen.add(key);
      skipping = false;
    }
    if (!skipping) out.push(line);
  }
  return out;
}
