/**
 * 小月：4，6，9，11
 * 大月：1，3，5，7，8，10，12
 * 二月：平年28 闰年(能被4整除且不能被100整除)29
 * 
 * 数据结构：
 * monthInfoList
 * [
 *  {
 *     month:1,
 *     dayNum:31, 
 *     boforeMoth:12,
 *  }
 * ......
 * ]
 * //小于7情况 前一个月dayNum - (7-dayNow) + 1
 * 算法：
 *  输入年月日(2020-04-09)
 * 年月日拆开 有0则去0 得到yearNow(2020) monthNow(4) dayNow(9)
 * 算出昨天的日期 yewEnd monthEnd dayEnd
 *  if(dayEnd>=7{ 
 *      正常作减法(9 - 7 + 1)得到dayBegin
 *      monthBegin = monthEnd
 *      拼接日期 monthBegin/dayBegin
 *  }else{(2020-03-01)
 *      前一个月dayNum - (7-dayNow) + 1得到dayBegin
 *      monthBegin = 前一个月
 *      拼接日期 monthBegin/dayBegin
 *  }
 * 输出 monthBegin.dayBegin,monthEnd.dayEnd
 *      
 */
/**
 * param dateNow 当前年月日(格式YYYY-MM-dd)
 */
const BIGMONTH = [1, 3, 5, 7, 8, 10, 12];
const SMALLMONTH = [4, 6, 9, 11];
function getLateSevenDay(dateNow) {
    let monthInfoList = [];
    let yearNow = '';
    let monthNow = '';
    let dayNow = '';
    let yearEnd = '';
    let monthEnd = '';
    let dayEnd = '';
    let yearBegin = '';
    let monthBegin = '';
    let dayBegin = '';
    let islYear = false;//是否是闰年
    //初始化当前年月日
    yearNow = dateNow.split("-")[0];
    monthNow = dateNow.split("-")[1];
    dayNow = dateNow.split("-")[2];
    if (monthNow.indexOf('0') > -1) {
        monthNow = monthNow.replace('0', '');
    }
    if (dayNow.indexOf('0') > -1) {
        dayNow = dayNow.replace('0', '');
    }
    islYear = isLeapYear(yearNow);

    //初始化monthInfoList
    for (let i = 0; i < 12; i++) {
        monthInfoList.push({
            month: i + 1,
            dayNum: 0,
            beforeMonth: 0
        })
    }
    monthInfoList.forEach(item => {
        if (BIGMONTH.indexOf(item.month) > -1) {
            item.dayNum = 31;
            item.beforeMonth = item.month === 1 ? 12 : item.month - 1
        } else if (SMALLMONTH.indexOf(item.month) > -1) {
            item.dayNum = 30;
            item.beforeMonth = item.month === 1 ? 12 : item.month - 1
        } else {
            islYear ? item.dayNum = 29 : item.dayNum = 28;
            item.beforeMonth = 1; 
        }
    })

    //计算yearEnd monthEnd dayEnd
    if (dayNow == 1) {
        let targetMonthInfo = monthInfoList.find(item => item.month == monthNow);
        yearEnd = monthNow == 1 ? (parseInt(yearNow) - 1).toString() : yearNow;
        monthEnd = targetMonthInfo.beforeMonth;
        let beforeMonthInfo = monthInfoList.find(item => item.month == targetMonthInfo.beforeMonth)
        dayEnd = beforeMonthInfo.dayNum;
    } else {
        yearEnd = yearNow;
        monthEnd = monthNow;
        dayEnd = (parseInt(dayNow) - 1).toString();
    }

    //计算yearBegin monthBegin dayBegin
    if (parseInt(dayEnd) >= 7) {
        dayBegin = (parseInt(dayEnd) - 6).toString();
        monthBegin = monthEnd.toString();
    } else {
        let targetMonthInfo = monthInfoList.find(item => item.month == monthNow);
        let beforeMonthInfo = monthInfoList.find(item => item.month == targetMonthInfo.beforeMonth);
        dayBegin = (parseInt(beforeMonthInfo.dayNum) + parseInt(dayNow) - 6).toString();
        monthBegin = targetMonthInfo.beforeMonth.toString();
        if (dayEnd == 1 && monthEnd == 1) {
            yearBegin = (parseInt(yearEnd) - 1).toString();
        } else {
            yearBegin = yearEnd.toString();
        }
    }
    let sevenDayList = generateSevenDay(parseInt(monthBegin), parseInt(dayBegin), parseInt(monthEnd), parseInt(dayEnd));
    return sevenDayList;
}
/**
 * param year(字符串)
 */
function isLeapYear(year) {
    let flag = false;
    if (parseInt(year) % 4 == 0 && parseInt(year) % 100 !== 0) {
        flag = true;
    }
    return flag;
}
/**
 * 开始月日 结束月日(数字)
 */
function generateSevenDay(monthBegin, dayBegin,monthEnd, dayEnd){
    let count = 0;
    let sevenDayList = [];
    if (monthBegin === monthEnd) {
        for (let i = 0; i < 7; i++) {
            sevenDayList.push(monthBegin+"."+dayBegin.toString());
            dayBegin++;
        }
    } else {
        let rest = 7 - dayEnd;
        for(let i=0;i<rest;i++){
            sevenDayList.push(monthBegin+"."+dayBegin.toString());
            dayBegin++;
        }
        for(let i=0;i<dayEnd;i++){
            count++;
            sevenDayList.push(monthEnd+"."+count.toString());
        }
    }
    return sevenDayList;
}
//测试
let result = getLateSevenDay('2020-01-01');
console.log(result);