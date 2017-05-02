const fs=require('fs');

exports.get_test_data=function(){
    let content=fs.readFileSync('./mock/test.json','utf-8');
    return content;
}