module.exports = {
    height: (() => {
        const arr = new Array()
        for (let i = 30; i <= 210; i++) {
            arr.push(i.toString() + 'cm')
        }
        return arr
    })(), // 30 - 210
    weight: (() => {
        const arr = new Array()
        for (let i = 0; i <= 100; i++) {
            arr.push(i.toString() + 'kg')
        }
        return arr
    })(), // 0 - 100
    sex:(()=>{
      const arr = new Array();
      arr.push("男");
      arr.push("女");
      return arr;
    })()
}
