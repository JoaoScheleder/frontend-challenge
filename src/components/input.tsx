export default function Input({placeholder,type,value}: Readonly<{placeholder: string;type: string;value: string;}>) {
    return (
        <input className="border-none outline-none bg-zinc-700 p-4 rounded-2xl w-full text-white"
         placeholder={placeholder} type={type} defaultValue={value}></input>
    )
}