const draw = (params) => {
    const base = document.getElementById('base');
    base.className = params.get('visual') || 'default';
    base.append(buildTable());

    drawRecords(params);
    drawNumber(params);
    drawName(params);
    drawAccessories(params);
};

const draw_record_regexp = /([a-zA-Z]+)(\d\d)(\d\d)/;

const drawRecords = (params) => {
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
    if(records.length < 50) {
        appendNewStump(params, records);
    } else {
        appendNewSheet(params);
    }
    return records;
};

const appendNewSheet = (params) => {
    const currentSheetNo = Number(params.get('no') || '1');
    const base = document.getElementById('base');
    const newSheet = document.createElement('div');
    newSheet.id = 'newSheet';
    newSheet.innerHTML = `<button id="newSheet-generate">次のスタンプカードを作る</button>`;
    base.append(newSheet);
    document.getElementById('newSheet-generate').onclick = (e) => {
        const paramArray = [`no=${currentSheetNo + 1}`];
        params.forEach((val, key)=>{
            if(key === 'record' || key === 'no') {
                return;
            } else {
                paramArray.push(`${key}=${val}`);
            }
        });
        location.href = `${location.origin}${location.pathname}?${paramArray.join('&')}`;
    };
};

const appendNewStump = (params, records) => {
    const timeDiff = ((new Date()).getTimezoneOffset()) * 60 * 1000 * -1;
    const currentDate = Number(new Date())
    const today = (new Date(currentDate + timeDiff)).toISOString().slice(0, 10);
    document.getElementById(`stump${numberToString(records.length)}`).innerHTML = `
        <div id="new-stump">
            <select id="new-stump-category">
                <option value="c">クリティカル</option>
                <option value="f">ファンブル</option>
            </select>
            <input type="date" id="new-stump-date" value="${today}"/>
            <button id="new-stump-add">追加</button>
        </div>
    `;
    document.getElementById('new-stump-add').onclick = (e) => {
        const date = document.getElementById('new-stump-date').value;
        const category = document.getElementById('new-stump-category').value;
        params.set(
            'record',
            (params.has('record') ? `${params.get('record')},` : '') + `${category}${date.slice(5,7)}${date.slice(8)}`
        );
        const paramArray = [];
        params.forEach((val, key)=>{
            paramArray.push(`${key}=${val}`);
        });
        location.href = `${location.origin}${location.pathname}?${paramArray.join('&')}`;
    };
};

const drawNumber = (params) => {
    const num = params.get('no') || '1';
    const base = document.getElementById('base');
    const numberDom = document.createElement('div');
    numberDom.id = 'number';
    numberDom.textContent = num;
    base.append(numberDom);
    return num;
};

const numberToString = (num) => {
    return String( num ).padStart(2, '0')
};

const drawName = (params) => {
    const name = params.get('name') || '';
    const $base = document.getElementById('base');
    const $name = document.createElement('div');
    $name.id = 'name';
    $name.textContent = name;
    $base.append($name);
    return name;
};

const drawAccessories = (params) => {
    const $base = document.getElementById('base');
    const newButton = document.createElement('button');
    newButton.id = 'newButton';
    newButton.textContent = '新しいクリティカル・ファンブル スタンプカードを作る';
    $base.append(newButton);
    newButton.onclick = (e) => {
        location.href = `${location.origin}${location.pathname}`;
    };
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

const STUMP_CATEGORIES = {
    c: 'critical',
    f: 'fumble'
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

    const developerInfo = document.createElement('div');
    developerInfo.innerHTML = `<a href="https://twitter.com/Shunshun94" target="_blank">作者コンタクト</a> / <a href="https://github.com/Shunshun94/crifumTicketr" target="_blank">ソースコード</a> / <a href="https://amzn.asia/8mNqdKy" target="_blank">作者を支援する</a>`;
    footer.append(developerInfo);

    const stumpBaseInfo = document.createElement('div');
    stumpBaseInfo.innerHTML = `このツールは <a href="https://twitter.com/kirei_toilet/" target="_blank">@KIREI_TOILET さん</a>がフリーで配布なさっているクリファンスタンプカードに着想を得て作成していますが、配布元とは無関係です`;
    footer.append(stumpBaseInfo);

    document.getElementById('base').append(footer);
};

const askName = (params) => {
    document.getElementById('base').innerHTML = `
        <p id="name-request">名前を入力してください（表示に使用します）<br/>
        <input id="name-request-input" type="text" /><br/><br/>
        <button id="name-request-send">この名前でカードを作成する！</button></p>
    `;
    document.getElementById('name-request-send').onclick = (e) => {
        const name = document.getElementById('name-request-input').value;
        const currentParam = location.search.slice(1);
        location.href = `${location.origin}${location.pathname}?name=${name}&no=1&${currentParam}`;
    };
};

const init = () => {
    const params = io.github.shunshun94.util.getQueries();
    if(params.get('name')) {
        draw(params);
    } else {
        askName(params);
    }
    addInfo(params);
}

init();