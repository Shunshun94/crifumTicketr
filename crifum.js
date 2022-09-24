const STUMP_CATEGORIES = {
    c: 'critical',
    f: 'fumble'
};

const draw_record_regexp = /([a-zA-Z]+)(\d\d)(\d\d)/;

const draw = (params) => {
    const base = document.getElementById('base');
    base.className = params.get('visual') || 'default';
    base.append(buildTable());

    const records = stumpList(params);
    records.forEach((d, i)=>{
        const stump = document.createElement('div');
        stump.className = d.category;

        const img = document.createElement('div');
        img.className = `stump-img stump-${d.category}-img`;
        stump.append(img);

        const date = document.createElement('div');
        date.className = `stump-date stump-${d.category}-date`;
        date.textContent = d.date;
        stump.append(date);

        document.getElementById(`stump${numberToString(i)}`).append(stump);
    });
};

const numberToString = (num) => {
    return String( num ).padStart(2, '0')
};

const buildTable = () => {
    const table = document.createElement('table');
    const trs = [
        document.createElement('tr'),
        document.createElement('tr'),
        document.createElement('tr'),
        document.createElement('tr'),
        document.createElement('tr')
    ];
    trs.forEach((tr, i) => {
        for(var j = 0; j < 10; j++) {
            const td = document.createElement('td');
            td.id = `stump${numberToString( i * 10 + j )}`;
            tr.append(td);
        }
        table.append(tr);
    });
    return table;
};

const stumpList = (params) => {
    return (params.get('record') || '').split(',').map((r, i)=>{
        try {
            if(r) {
                const execResult = draw_record_regexp.exec(r);
                return {
                    category: STUMP_CATEGORIES[execResult[1]],
                    date: `${execResult[2]}/${execResult[3]}`
                };
            } else {
                return false;
            }
        } catch (e) {
            console.error(e, r, i);
            throw e;
        }
    }).filter((r)=>{return r;});
};

const addInfo = (params) => {
    const footer = document.createElement('footer');

    const stumpBaseInfo = document.createElement('div');
    const stumpBaseLink = document.createElement('a');
    stumpBaseLink.href = 'https://twitter.com/kirei_toilet/status/1290950684947304448';
    stumpBaseLink.textContent = 'スタンプカードは @KIREI_TOILET さんがフリーで配布なさっているクリファンスタンプカードです';
    stumpBaseLink.target = '_blank';
    stumpBaseInfo.append(stumpBaseLink);
    footer.append(stumpBaseInfo);
    document.getElementById('base').append(footer);
};

const init = () => {
    const params = io.github.shunshun94.util.getQueries();
    draw(params);
    addInfo(params);
}

init();