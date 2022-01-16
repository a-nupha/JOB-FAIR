export default {
    name: 'functions',
    checkPID(id){
        const idcard = String(id).split('-').join('')
        if(idcard.value == ""){ return false;}
        if(idcard.length < 13){ return false;}
    
    var num = this.str_split(idcard); // function เพิ่มเติม
    var sum = 0;
    var total = 0;
    var digi = 13;
    
        for(let i=0;i<12;i++){
            sum = sum + (num[i] * digi);
            digi--;
        }
        total = ((11 - (sum % 11)) % 10);
        
        if(total == num[12]){ //	alert('รหัสหมายเลขประจำตัวประชาชนถูกต้อง');
            return true;
        }else{ //	alert('รหัสหมายเลขประจำตัวประชาชนไม่ถูกต้อง');
            return false;
        }
    },
     str_split ( f_string, f_split_length){
        f_string += '';
        if (f_split_length == undefined) {
            f_split_length = 1;
        }
        if(f_split_length > 0){
            var result = [];
            while(f_string.length > f_split_length) {
                result[result.length] = f_string.substring(0, f_split_length);
                f_string = f_string.substring(f_split_length);
            }
            result[result.length] = f_string;
            return result;
        }
        return false;
    }
    
   
}