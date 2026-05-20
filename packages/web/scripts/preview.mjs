import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import mimeDb from 'mime-db';

const host = process.env['HOST'] ?? '127.0.0.1';
const port = Number.parseInt(process.env['PORT'] ?? '4173', 10);
const basePath = normalizeBasePath(process.env['BASE_PATH'] ?? '/dantalion/');
const outputDir = fileURLToPath(new URL('../.output/public/', import.meta.url));
const fallback404Path = join(outputDir, '404.html');

if (!existsSync(outputDir)) {
  console.error(
    `Built output was not found at ${outputDir}. Run "pnpm --filter @kurone-kito/dantalion-web-demo-web run build" first.`,
  );
  process.exit(1);
}

const mimeTypes = Object.entries(mimeDb).reduce(
  (registry, [type, metadata]) => {
    for (const extension of metadata.extensions ?? []) {
      registry[`.${extension}`] = type;
    }

    return registry;
  },
  /** @type {Record<string, string>} */ ({}),
);

const server = createServer(async (request, response) => {
  if (!request.url) {
    response.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Bad Request');
    return;
  }

  const requestUrl = new URL(request.url, `http://${host}:${port}`);
  const pathname = requestUrl.pathname;

  if (pathname === '/') {
    response.writeHead(302, { location: basePath });
    response.end();
    return;
  }

  if (!pathname.startsWith(basePath)) {
    await sendFile(response, fallback404Path, 404);
    return;
  }

  const relativePath = pathname.slice(basePath.length) || 'index.html';
  const filePath = await resolveFilePath(relativePath);

  if (!filePath) {
    await sendFile(response, fallback404Path, 404);
    return;
  }

  await sendFile(response, filePath);
});

server.listen(port, host, () => {
  console.log(`Previewing ${outputDir} at http://${host}:${port}${basePath}`);
});

/**
 * @param {string} input
 */
function normalizeBasePath(input) {
  const trimmed = input.trim();
  if (trimmed === '/' || trimmed === '') {
    return '/';
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
}

/**
 * @param {string} relativePath
 */
async function resolveFilePath(relativePath) {
  const normalizedPath = normalize(relativePath).replace(
    /^(\.\.(\/|\\|$))+/,
    '',
  );
  const directPath = join(outputDir, normalizedPath);
  const indexPath = join(outputDir, normalizedPath, 'index.html');
  const htmlPath = normalizedPath.endsWith('.html')
    ? directPath
    : join(outputDir, `${normalizedPath}.html`);

  for (const candidate of [directPath, indexPath, htmlPath]) {
    if (!(await isFile(candidate))) {
      continue;
    }

    return candidate;
  }

  return null;
}

/**
 * @param {string} candidate
 */
async function isFile(candidate) {
  try {
    return (await stat(candidate)).isFile();
  } catch {
    return false;
  }
}

/**
 * @param {import('node:http').ServerResponse} response
 * @param {string} filePath
 * @param {number} [statusCode]
 */
async function sendFile(response, filePath, statusCode = 200) {
  const extension = extname(filePath);
  const contentType = mimeTypes[extension] ?? 'application/octet-stream';
  const body = createReadStream(filePath);

  response.writeHead(statusCode, {
    'content-type':
      extension === '.html' ? `${contentType}; charset=utf-8` : contentType,
  });

  body.on('error', () => {
    response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Internal Server Error');
  });

  body.pipe(response);
}
