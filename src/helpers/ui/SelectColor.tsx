import React, { useState } from 'react';

const ColorSelector = ({color,colorlist}:{color:string,colorlist:string[]}) => {
    const [selectedColor, setSelectedColor] = useState<string | null>(color);

    const colors = colorlist;

   

    return (
        <div>
            <div className="flex gap-[1rem]">
                <div
                    className={`w-10 h-10 rounded-full cursor-pointer border-2 relative ${selectedColor === null ? 'border-black' : 'border-gray-300'
                        }`}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-[1.5px] bg-gray-300 rotate-[135deg]"></div>
                    </div>
                </div>
                {colors.map((color) => (
                    <div key={color} className={`rounded-full p-[3px] ${selectedColor === color ? 'border-black  border-1' : 'border-none'
                        }`}>
                        <div className={`w-10 h-10 rounded-full cursor-pointer`}
                            style={{ backgroundColor: color }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorSelector;

