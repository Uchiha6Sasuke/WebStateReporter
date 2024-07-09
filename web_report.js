function Repo(yesterday, today){
    let disappear = [];
    let appear = [];
    let change = [];

    function isEqual(arr1, arr2){
        // вспомогательная функция
        if (arr1.length !== arr2.length) return false;
        for (let i=0; i < arr1.length; i++){
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
    // проверка состояний веб-страниц
    for(let[url, yesterdayVals] of yesterday.entries()){
        let todayVals = today.get(url) || [];

        if (todayVals.length === 0){
            disappear.push(url);
        }
        else if (!isEqual(yesterdayVals, todayVals)){
            change.push(url);
        }
    }
    
    for(let[url, todayVals] of today.entries()){
        if (!yesterday.has(url)){
            appear.push(url);
        }
    }
    // составление письма с учетом всех проверок
    return `
    Здравствуйте, дорогая и.о. секретаря

    За последние сутки во вверенных Вам сайтах произошли следующие изменения:

    Исчезли следующие страницы: ${disappear.length > 0 ? disappear.join(', ') : 'отсутствуют'}
    Появились следующие новые страницы: ${appear.length > 0 ? appear.join(', ') : 'отсутствуют'}
    Изменились следующие страницы: ${change.length > 0 ? change.join(', ') : 'отсутствуют'}

    С уважением,
    автоматизированная система
    мониторинга.
    `;
}

// проверка скрипта на тестовом наборе данных
const yesterday = new Map();
yesterday.set("http://softaria.ru/page1", ["<html>Old content</html>"]);
yesterday.set("http://softaria.ru/page2", ["<html>Old content</html>"]);
yesterday.set("http://softaria.ru/page3", ["<html>Old content</html>"]);

const today = new Map();
today.set("http://softaria.ru/page1", ["<html>New content</html>"]);
today.set("http://softaria.ru/page2", ["<html>Old content</html>"]);
today.set("http://softaria.ru/page4", ["<html>New content</html>"]);

console.log(Repo(yesterday, today))