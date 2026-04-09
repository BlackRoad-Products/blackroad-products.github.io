#!/usr/bin/env node
// build-empire-json.js
// Usage: node build-empire-json.js > empire.json
// Reads ~/blackroad-repo-index.json and outputs empire.json to stdout.

const fs = require('fs');
const path = require('path');

const REPO_INDEX = path.join(process.env.HOME || '/Users/alexa', 'blackroad-repo-index.json');

const PRODUCTS = [
  { type: 'product', name: 'BlackRoad OS', agent: 'Roadie', desc: 'Sovereign AI desktop OS — 18 products, 27 agents, persistent memory. Browser-native.', url: 'https://os.blackroad.io', pill: 'os.blackroad.io', tags: ['os', 'desktop', 'browser', 'sovereign'] },
  { type: 'product', name: 'RoadTrip', agent: 'Cecilia', desc: '27-agent hub with persistent memory, real-time chat, and fleet orchestration.', url: 'https://roadtrip.blackroad.io', pill: 'roadtrip.blackroad.io', tags: ['agents', 'chat', 'fleet', 'memory'] },
  { type: 'product', name: 'RoadBook', agent: 'Lucidia', desc: 'Open knowledge platform — research, synthesis, and ambient intelligence.', url: 'https://roadbook.blackroad.io', pill: 'roadbook.blackroad.io', tags: ['knowledge', 'wiki', 'publishing', 'research'] },
  { type: 'product', name: 'RoadChain', agent: 'Gematria', desc: 'Immutable ledger for provenance, verification, and truth anchoring.', url: 'https://roadchain.blackroad.io', pill: 'roadchain.blackroad.io', tags: ['ledger', 'blockchain', 'provenance', 'verification'] },
  { type: 'product', name: 'RoadCode', agent: 'Silas', desc: 'Browser code editor with AI-powered completion, multi-language support, and instant run.', url: 'https://roadcode.blackroad.io', pill: 'roadcode.blackroad.io', tags: ['code', 'editor', 'ide', 'browser', 'ai'] },
  { type: 'product', name: 'RoadCoin', agent: 'Atticus', desc: 'The incentive layer — earn, spend, and track value across the BlackRoad ecosystem.', url: 'https://roadcoin.blackroad.io', pill: 'roadcoin.blackroad.io', tags: ['coin', 'token', 'economy', 'incentive'] },
  { type: 'product', name: 'RoadWorld', agent: 'Gaia', desc: 'AI game engine and metaverse — Gaia monitors every pixel, world, and agent.', url: 'https://roadworld.blackroad.io', pill: 'roadworld.blackroad.io', tags: ['game', 'metaverse', 'world', 'engine', 'ai'] },
  { type: 'product', name: 'RoadWork', agent: 'Octavia', desc: 'Project and task management for BlackRoad OS teams. AI-assisted, fleet-aware.', url: 'https://roadwork.blackroad.io', pill: 'roadwork.blackroad.io', tags: ['work', 'project', 'tasks', 'management', 'business'] },
  { type: 'product', name: 'RoadView', agent: 'Olympia', desc: 'Intelligent search with verified results, credibility scoring, and RoadChain provenance.', url: 'https://search.blackroad.io', pill: 'search.blackroad.io', tags: ['search', 'discovery', 'verified', 'ai'] },
  { type: 'product', name: 'BackRoad', agent: 'Sophia', desc: 'Social media OS — schedule, analyze, and grow across every platform.', url: 'https://social.blackroad.io', pill: 'social.blackroad.io', tags: ['social', 'media', 'schedule', 'analytics'] },
  { type: 'product', name: 'BlackBoard', agent: 'Calliope', desc: 'Team whiteboard and knowledge canvas — real-time collaboration with AI synthesis.', url: 'https://board.blackroad.io', pill: 'board.blackroad.io', tags: ['whiteboard', 'canvas', 'collaboration', 'creative'] },
  { type: 'product', name: 'CarKeys', agent: 'Celeste', desc: 'Post-quantum security vault — sovereign credential and secret management.', url: 'https://carkeys.blackroad.io', pill: 'carkeys.blackroad.io', tags: ['security', 'vault', 'credentials', 'auth', 'quantum'] },
  { type: 'product', name: 'CarPool', agent: 'Elias', desc: 'AI-to-AI integration hub — connect ChatGPT, Claude, Gemini, and all your AI tools.', url: 'https://carpool.blackroad.io', pill: 'carpool.blackroad.io', tags: ['ai', 'integration', 'model', 'router', 'hub'] },
  { type: 'product', name: 'OfficeRoad', agent: 'Aria', desc: 'Virtual pixel office for BlackRoad OS teams — remote-first, AI-powered, pixel-native.', url: 'https://officeroad.blackroad.io', pill: 'officeroad.blackroad.io', tags: ['office', 'remote', 'pixel', 'virtual', 'team'] },
  { type: 'product', name: 'OneWay', agent: 'Valeria', desc: 'Data portability OS — export your BlackRoad data anytime, any format, one API.', url: 'https://oneway.blackroad.io', pill: 'oneway.blackroad.io', tags: ['export', 'data', 'portability', 'api'] },
  { type: 'product', name: 'RoadSide', agent: 'Thalia', desc: 'Personal onboarding agent — sets up BlackRoad OS in 2 minutes, your way.', url: 'https://roadside.blackroad.io', pill: 'roadside.blackroad.io', tags: ['onboarding', 'setup', 'agent', 'welcome'] },
  { type: 'product', name: 'Roadie Tutor', agent: 'Roadie', desc: 'Flagship AI tutor — Socratic method, deep memory, 8 learning paths, K-12 curriculum.', url: 'https://tutor.blackroad.io', pill: 'tutor.blackroad.io', tags: ['tutor', 'education', 'learning', 'ai', 'k12'] },
  { type: 'product', name: 'Roadie Academy', agent: 'Roadie', desc: '26-module K-12 curriculum. Learn to build BlackRoad. Pass quizzes to unlock repos.', url: 'https://roadtrip.blackroad.io/curriculum', pill: 'Roadie Academy', tags: ['academy', 'curriculum', 'education', 'modules'] },
];

const AGENTS = [
  { type: 'agent', name: 'Roadie', role: 'Flagship Tutor & OS Guide', product: 'BlackRoad OS / Tutor', url: 'https://tutor.blackroad.io', tags: ['tutor', 'os', 'guide', 'flagship'] },
  { type: 'agent', name: 'Cecilia', role: 'Fleet Orchestrator & Creative Lead', product: 'RoadTrip', url: 'https://roadtrip.blackroad.io', tags: ['fleet', 'orchestrator', 'creative', 'pi'] },
  { type: 'agent', name: 'Lucidia', role: 'Knowledge & Research Agent', product: 'RoadBook', url: 'https://roadbook.blackroad.io', tags: ['knowledge', 'research', 'reasoning'] },
  { type: 'agent', name: 'Gematria', role: 'Ledger & Provenance Agent', product: 'RoadChain', url: 'https://roadchain.blackroad.io', tags: ['ledger', 'math', 'verification', 'chain'] },
  { type: 'agent', name: 'Silas', role: 'Code Editor Agent', product: 'RoadCode', url: 'https://roadcode.blackroad.io', tags: ['code', 'editor', 'development'] },
  { type: 'agent', name: 'Atticus', role: 'Economy & Incentive Agent', product: 'RoadCoin', url: 'https://roadcoin.blackroad.io', tags: ['economy', 'coin', 'incentive'] },
  { type: 'agent', name: 'Gaia', role: 'World Builder & Game Engine Agent', product: 'RoadWorld', url: 'https://roadworld.blackroad.io', tags: ['world', 'game', 'metaverse', 'engine'] },
  { type: 'agent', name: 'Octavia', role: 'Project Management Agent', product: 'RoadWork', url: 'https://roadwork.blackroad.io', tags: ['project', 'management', 'tasks', 'business'] },
  { type: 'agent', name: 'Olympia', role: 'Search & Discovery Agent', product: 'RoadView', url: 'https://search.blackroad.io', tags: ['search', 'discovery', 'verification'] },
  { type: 'agent', name: 'Sophia', role: 'Social Media & Analytics Agent', product: 'BackRoad', url: 'https://social.blackroad.io', tags: ['social', 'analytics', 'media'] },
  { type: 'agent', name: 'Calliope', role: 'Creative Canvas Agent', product: 'BlackBoard', url: 'https://board.blackroad.io', tags: ['creative', 'canvas', 'whiteboard'] },
  { type: 'agent', name: 'Celeste', role: 'Security Vault Agent', product: 'CarKeys', url: 'https://carkeys.blackroad.io', tags: ['security', 'vault', 'auth', 'quantum'] },
  { type: 'agent', name: 'Elias', role: 'AI Model Router Agent', product: 'CarPool', url: 'https://carpool.blackroad.io', tags: ['model', 'router', 'integration', 'ai'] },
  { type: 'agent', name: 'Aria', role: 'Virtual Office Agent', product: 'OfficeRoad', url: 'https://officeroad.blackroad.io', tags: ['office', 'remote', 'pixel', 'virtual'] },
  { type: 'agent', name: 'Valeria', role: 'Data Export Agent', product: 'OneWay', url: 'https://oneway.blackroad.io', tags: ['export', 'data', 'portability'] },
  { type: 'agent', name: 'Thalia', role: 'Onboarding Agent', product: 'RoadSide', url: 'https://roadside.blackroad.io', tags: ['onboarding', 'setup', 'welcome'] },
  { type: 'agent', name: 'Marcus', role: 'Product Manager Agent', product: 'Infrastructure', url: 'https://roadtrip.blackroad.io', tags: ['product', 'management', 'roadmap'] },
  { type: 'agent', name: 'Viktor', role: 'Senior Developer Agent', product: 'Infrastructure', url: 'https://roadtrip.blackroad.io', tags: ['developer', 'code', 'architecture'] },
  { type: 'agent', name: 'Luna', role: 'UX Designer Agent', product: 'Creative', url: 'https://roadtrip.blackroad.io', tags: ['ux', 'design', 'interface', 'accessibility'] },
  { type: 'agent', name: 'Dante', role: 'Backend Engineer Agent', product: 'Infrastructure', url: 'https://roadtrip.blackroad.io', tags: ['backend', 'api', 'database', 'engineering'] },
  { type: 'agent', name: 'Aria-Prime', role: 'Code Specialist Agent', product: 'Coding Team', url: 'https://roadtrip.blackroad.io', tags: ['code', 'specialist', 'refactor'] },
  { type: 'agent', name: 'Alice', role: 'Fleet Manager (Pi)', product: 'Fleet', url: 'https://roadtrip.blackroad.io', tags: ['fleet', 'raspberry-pi', 'mesh', 'hardware'] },
  { type: 'agent', name: 'Road', role: 'OS Orchestrator', product: 'BlackRoad OS', url: 'https://os.blackroad.io', tags: ['orchestrator', 'os', 'core'] },
  { type: 'agent', name: 'Nova', role: 'Memory & Indexing Agent', product: 'Memory System', url: 'https://roadtrip.blackroad.io', tags: ['memory', 'indexing', 'knowledge'] },
  { type: 'agent', name: 'Iris', role: 'Analytics Agent', product: 'Analytics', url: 'https://board.blackroad.io', tags: ['analytics', 'data', 'metrics'] },
  { type: 'agent', name: 'Rex', role: 'Security & Audit Agent', product: 'Security', url: 'https://carkeys.blackroad.io', tags: ['security', 'audit', 'monitoring'] },
  { type: 'agent', name: 'Zara', role: 'Community & Comms Agent', product: 'BackRoad', url: 'https://social.blackroad.io', tags: ['community', 'comms', 'social'] },
];

const DOMAINS = [
  { type: 'domain', name: 'blackroad.io', desc: 'Primary product domain — 18 canonical product subdomains', url: 'https://blackroad.io', tags: ['primary', 'products', 'canonical'] },
  { type: 'domain', name: 'os.blackroad.io', desc: 'BlackRoad OS shell — browser-native desktop', url: 'https://os.blackroad.io', tags: ['os', 'shell', 'desktop'] },
  { type: 'domain', name: 'blackroad.dev', desc: 'Developer portal and SDK docs', url: 'https://blackroad.dev', tags: ['dev', 'sdk', 'docs'] },
  { type: 'domain', name: 'lucidia.earth', desc: 'Lucidia agent world — human-AI orchestration', url: 'https://lucidia.earth', tags: ['lucidia', 'ai', 'orchestration'] },
  { type: 'domain', name: 'lucidia.studio', desc: 'Lucidia creative studio', url: 'https://lucidia.studio', tags: ['lucidia', 'creative', 'studio'] },
  { type: 'domain', name: 'blackroadai.com', desc: 'AI-facing brand domain', url: 'https://blackroadai.com', tags: ['ai', 'brand'] },
  { type: 'domain', name: 'blackboxprogramming.io', desc: 'BlackBox Programming — legacy dev brand', url: 'https://blackboxprogramming.io', tags: ['legacy', 'programming', 'blackbox'] },
  { type: 'domain', name: 'aliceqi.com', desc: 'Alice agent domain — Pi fleet AI', url: 'https://aliceqi.com', tags: ['alice', 'agent', 'pi', 'fleet'] },
  { type: 'domain', name: 'roadtrip.blackroad.io', desc: 'RoadTrip — 27 agents, fleet hub', url: 'https://roadtrip.blackroad.io', tags: ['agents', 'fleet', 'hub'] },
  { type: 'domain', name: 'roadcode.blackroad.io', desc: 'RoadCode — browser IDE', url: 'https://roadcode.blackroad.io', tags: ['code', 'ide'] },
  { type: 'domain', name: 'search.blackroad.io', desc: 'RoadView — sovereign search', url: 'https://search.blackroad.io', tags: ['search', 'sovereign'] },
  { type: 'domain', name: 'social.blackroad.io', desc: 'BackRoad — social OS', url: 'https://social.blackroad.io', tags: ['social', 'media'] },
  { type: 'domain', name: 'chat.blackroad.io', desc: 'RoadChat — direct AI chat', url: 'https://chat.blackroad.io', tags: ['chat', 'ai'] },
  { type: 'domain', name: 'blackroad.company', desc: 'Corporate entity domain', url: 'https://blackroad.company', tags: ['corporate', 'company'] },
  { type: 'domain', name: 'blackroadinc.us', desc: 'US incorporation domain', url: 'https://blackroadinc.us', tags: ['legal', 'us', 'incorporation'] },
];

function buildRepos() {
  if (!fs.existsSync(REPO_INDEX)) {
    process.stderr.write('Warning: ' + REPO_INDEX + ' not found — repos will be empty\n');
    return [];
  }
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(REPO_INDEX, 'utf8'));
  } catch (e) {
    process.stderr.write('Error parsing ' + REPO_INDEX + ': ' + e.message + '\n');
    return [];
  }
  if (!Array.isArray(raw)) {
    process.stderr.write('Warning: repo index is not an array — repos will be empty\n');
    return [];
  }
  return raw.map(entry => {
    const languages = (entry.languages || '')
      .split(',')
      .map(l => l.trim().toLowerCase())
      .filter(Boolean);
    const domain = entry.domain
      ? [entry.domain.toLowerCase().replace(/\s+/g, '-')]
      : [];
    return {
      type: 'repo',
      name: entry.repo || entry.full || 'unknown',
      org: entry.org || '',
      full: entry.full || '',
      desc: entry.description || '',
      url: 'https://github.com/' + (entry.full || entry.repo),
      tags: [...new Set([...domain, ...languages])],
    };
  });
}

const repos = buildRepos();
const empire = {
  generated: new Date().toISOString(),
  products: PRODUCTS,
  agents: AGENTS,
  domains: DOMAINS,
  repos,
};

process.stdout.write(JSON.stringify(empire, null, 2) + '\n');
process.stderr.write(
  'empire.json built: ' + PRODUCTS.length + ' products, ' +
  AGENTS.length + ' agents, ' + DOMAINS.length + ' domains, ' +
  repos.length + ' repos\n'
);
