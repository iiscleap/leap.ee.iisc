document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('publication-search');
    const status = document.getElementById('publication-search-status');
    const clearBtn = document.getElementById('publication-search-clear');
    const container = document.getElementById('thesis-list');
    if (!input || !container) return;

    const items = Array.from(container.querySelectorAll('article.publication-item'));
    const headers = Array.from(container.querySelectorAll('h2'));

    function matches(article, query) {
        const title = article.querySelector('h3');
        const authors = article.querySelector('span.font-semibold');
        const venue = article.querySelector('p.italic');
        const haystack = (
            (title ? title.textContent : '') + ' ' +
            (authors ? authors.textContent : '') + ' ' +
            (venue ? venue.textContent : '')
        ).toLowerCase();
        return haystack.includes(query);
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function sectionArticles(header) {
        const result = [];
        let node = header.nextElementSibling;
        while (node && node.tagName !== 'H2') {
            if (node.tagName === 'ARTICLE') result.push(node);
            node = node.nextElementSibling;
        }
        return result;
    }

    function applyFilter() {
        const query = input.value.trim().toLowerCase();
        let visibleCount = 0;

        items.forEach(article => {
            const show = query === '' || matches(article, query);
            article.style.display = show ? '' : 'none';
            if (show) visibleCount++;
        });

        headers.forEach(header => {
            const anyVisible = sectionArticles(header).some(a => a.style.display !== 'none');
            header.style.display = anyVisible ? '' : 'none';
        });

        if (clearBtn) clearBtn.hidden = query === '';

        const safeQuery = escapeHtml(input.value.trim());

        if (query === '') {
            status.textContent = '';
        } else if (visibleCount === 0) {
            status.innerHTML = `No publications found for &ldquo;<span class="query">${safeQuery}</span>&rdquo;`;
        } else {
            status.innerHTML = `<span class="count">${visibleCount}</span> publication${visibleCount === 1 ? '' : 's'} matching &ldquo;<span class="query">${safeQuery}</span>&rdquo;`;
        }
    }

    input.addEventListener('input', applyFilter);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            input.focus();
            applyFilter();
        });
    }
});
