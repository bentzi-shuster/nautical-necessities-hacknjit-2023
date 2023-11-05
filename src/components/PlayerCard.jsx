import Image from "next/image"
export default function PlayerCard({name, width, height}){
    return(<div className={` tooltip relative w-[${width}px] mt-10 tooltip-open h-[${height}px]`} data-tip={name}>
       
        <Image src={"https://api.dicebear.com/7.x/croodles-neutral/svg?seed="+name} width={width} height={height} alt="avatar" className=" absolute z-20 rounded-full  inset-0 " />
        {/* center */}
        <Image src="/blood.png" width={width} height={height} alt="blood" className="rounded-full absolute inset-0 z-10 scale-[85%] opacity-90" />
        <Image src="/vollyball.png" width={width} height={height} alt="volleyball" className=" rounded-full  inset-0 z-0 scale-125"  />
 

        
        {/* <div className="text-center mt-auto ">
        <p className="text-black z-50 font-bold text-xl">{name}</p>
        </div> */}
        </div>
    )
}