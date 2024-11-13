//// Old code or we would call it original code which I thought and was afraid 
//// that somebody unknown the meaning of this function
//// then I even change that to a new function 😍 😻 

// export const createReducer = <S>(
//   reducer: { [key: string]: Function },
//   state: S,
//   action: { [key: string]: any }
// ) => (reducer[action.type] ? reducer[action.type](state, action): state);

//New Function from chat GPT hahahaha 🐇 ♋ 
export const createReducer = <S>(
  reducer: { [key: string]: (state: S, action: any) => any }, // More explicit function signature
  state: S,
  action: { type: string; [key: string]: any }
) => (reducer[action.type] ? reducer[action.type](state, action) : state);

//For those who don't acknowledge that the Object callback, you can learn about this code even
const ss = "Name Pho Mueng Dee"
const text = 100000
const reDucerInstance :{[key: string]: (state: string, action: any) => any }={
   ["01"]:(state,action)=> (state+" kuay =>"+action.text),
   ["02"]:(state)=> (state+" sonteen")
}
const test = reDucerInstance["01"](ss,{text})
const test1 = reDucerInstance["02"](ss,{text})

console.log(test)
console.log(test1)

//Object assignment and Default Initial const obj: { [key: string]: any } = {}
const obj: { [key: string]: any } = {
  name: "GeeksforGeeks",
  category: "Programming",
  language: "TypeScript",
  // definition ('any') => the datatype that means has or no have even argument
  // exp. => to use func (string,string),(string,null),(string)
  func:(state:string,action:any) => (action === undefined || action === null|| action === ''?state :
  state  +" User Name: " + action.name + " | Address : "+ action.address)
};

//(string,object)
const showObj = obj["func"](" เมื่อไม่รู้ ใยเราไม่ลองอ่านดูเล๊า ",{name:"Bundit Somrak",address:"100/2205 หมู่ที่ 7 เอื้ออาทร บ้านสร้าง บางปะอิน พระนครศรีอยุธยา"})
console.log(showObj)

//(string)
const showObj1 = obj["func"](" เมื่อไม่รู้ ใยเราไม่ลองอ่านดูเล๊า undefined")
console.log(showObj1)

//(string,null)
const showObj2 = obj["func"](" เมื่อไม่รู้ ใยเราไม่ลองอ่านดูเล๊า null",null)
console.log(showObj2)

//(string,'')
const showObj3 = obj["func"](" เมื่อไม่รู้ ใยเราไม่ลองอ่านดูเล๊า '' empty value passed",'')
console.log(showObj3)
