export const flattenObj = (ob) => {
 
    const result = {};
    for (const i in ob) {
        if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
            const temp = flattenObj(ob[i]);
            for (const j in temp) {
  
                if (j === 'quantity' || j === 'material' || j === 'diameter') {
                result[i + '_' + j] = temp[j];   
              } else {
                result[j] = temp[j];  
              }
            }
        }
        else if (!Array.isArray(ob[i])) {
            result[i] = ob[i];
        }
    }
    return result;
  };
