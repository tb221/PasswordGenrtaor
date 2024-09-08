import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("");


  //useRef hook
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password])


  const passwordGenerator = useCallback(()=>{
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for(let i=1;i<=length;i++)
    {
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword]);
  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator]);
  return (
    <div className="bg-gray-700 w-full max-w-md mx-auto my-9 px-4 py-3 text-orange-500 shadow-md">
      <h2 className="text-center text-white my-3">Password Generator</h2>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref = {passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2 overflow-auto">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            id="lengthInput"
            onChange={(e)=>{
              setLength(e.target.value)
            }}
          />
          <label htmlFor="lengthInput">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked = {numberAllowed}
            id="numberInput"
            onChange={()=>{ 
              
              setNumberAllowed((prev)=>{
                return (!prev);
              })
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked = {charAllowed}
            onChange={()=>{
              
              setCharAllowed((prev)=>{
                return (!prev);
              })
            }}
            id="characterInput" 
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
