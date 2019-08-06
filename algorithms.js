function permutations(str){
    var arr = str.split(''),
        len = arr.length, 
        perms = [],
        rest,
        picked,
        restPerms,
        next;
    
        if (len == 0)
            return [str];
    
        for (var i=0; i<len; i++)
        {
            rest = Object.create(arr);
            picked = rest.splice(i, 1);
    
            restPerms = permutations(rest.join(''));
    
           for (var j=0, jLen = restPerms.length; j< jLen; j++)
           {
               next = picked.concat(restPerms[j]);
               perms.push(next.join(''));
           }
        }
       
       return perms;
    }
    
    permutations("this is going to be permute");
// //Fibbonachi recursive algorithm that returns an array of first n elements of fibbonachi series 
// const fib=(n) => {
//     //base case 
//     if (n<=1){
//       return [0,1];
//     }
  
//     //calling fib(n) for a number less than n each time recurcivly:
//     //example: 3  [0,1,1,2]
//     //         2  [0,1,1]
//     //         1  [0,1] 
//     let arr= fib(n-1); 
//     //adding last 2 members of the arr and pushing it to end of the arr
//     arr.push(arr[arr.length-1]+arr[arr.length-2]);
  
//     //returning the final arr
//     return arr;  
//   }

// //---------------------------------------------------------------------------------------------------

// //prime function accept an array of integers and return the array of prime numbers in it.
// let Arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// const prime = (Arr) =>{ 
 
//     //Looping through the Arr
//   for(let i=0; i<Arr.length ; i++){
//     // let prime =[];
//     //  if (Arr[i] == 0 || Arr[i] == 1) {
//     //         //  console.log("prime");
//     //         prime.push(Arr[i]);
//     //   }
//     //   if (Arr[i] == 2) { 
            
//     //   prime.push(Arr[i]);
//     //   }    
//     //  else{
//         //looping through numbers less than each number in the array
//        for(j=2 ; j<Arr[i] ;j++){
//           // console.log(j);
//           // console.log(Arr[i]%j !==0)
//           //if it is divisible by any number less than it self it is not prime so
//           if(Arr[i] % j === 0){
//             //remove it from the arr
//             Arr.splice(i,1);
//             // console.log(  Arr.splice(i, 1));
//             // console.log(Arr)               
//           } 
//        }   
//       // }   
//   } 
//   //return the rest of the array which are prime
//   return Arr;  
// }
// prime(Arr);

// //------------------------------------------------------------------------------------------

// //random function accept an integer and return a random string with length of n
// const random = (n) => {
  
//     // console.log(n)
//     //Main string to choose letters from
//     const string = "abcdefghijklmnopqrstuvwxyz1234567890";
//     //creating new empty random string
//     let newStr="";
    
//     //itirating from 0 to n and creating n random indexes and ultimatly random letters from string
//     //concatinating to the new string
//     for (let i=1; i<=n; i++){
//        newStr +=  string[Math.floor(Math.random() * string.length)];
//     }
  
//     //return the new random str
//     return newStr;
  
//   }
//   random(7);