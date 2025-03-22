// components/raw/RawItem.tsx
"use client";

import { Raw } from "@/app/types/Raw";
import { TiPin } from "react-icons/ti";
// import Chip from '@mui/material/Chip';
import { FaHashtag } from "react-icons/fa6";
import { Button } from "@mui/material";
import { formatDate } from "@/app/utils/helpers";

interface RawItemProps {
  raw: Raw;
  isAdmin: boolean;
  onEdit?:()=>void,
  onDelete?:()=>void
  onPin?:()=>void,
}

export default function RawItem({ raw, isAdmin,onDelete,onEdit,onPin }: RawItemProps) {

  return (
    <div className="bg-white rounded-xl shadow-lg transition-all transform hover:scale-102 hover:shadow-xl">
        <div className="p-6">
          <div className="flex justify-between gap-4">
          <pre className="whitespace-pre-wrap text-gray-700 font-sans">{raw.content}</pre>
          {raw.pinned && <span className="text-2xl"><TiPin className="fill-blue-500 " /></span>}
          </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2 sm:gap-4">
            {raw.tags.length > 0 && <span className="text-blue-500 text-xl"><FaHashtag /> </span>}
            <div className="flex gap-2 sm:gap-4 flex-wrap">
            {
              raw.tags.map((tagLabel: string,index:number) => (
                // <Chip label={tagLabel} key={tagLabel + index} onClick={()=>{} }
                // sx={{color:"#1447e6",bgcolor:"#dbeafe"}}
                // />
                <span
                  key={tagLabel + index}
                  className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full border border-blue-300 shadow-sm"
                >
                  {tagLabel}
                </span>
              ))
              }
              </div>
          </div>
            <span className="self-end">{formatDate(raw.createdAt)}</span>
          </div>
        </div>
          {isAdmin && (
            <div className="px-6 py-3 bg-gray-50 flex justify-end rounded-b-xl gap-2">
              {onEdit && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
              // className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
              aria-label="Edit Raw"
              // variant="contained"
              // sx={{backgroundColor:"#155dfc"}}
            >
              Edit
            </Button>
          )}
          
          {onDelete && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
              // variant="outlined"
              aria-label="Delete Raw"
              // className="bg-red-500 text-white"
              color="error"
              // sx={{backgroundColor:"#fb2c36",color:"white"}}
            >
              Delete
            </Button>
          )}
          {onPin && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                onPin();
              }}
              // className="px-3 py-1 bg-slate-600 text-white text-sm rounded hover:bg-slate-700 transition-colors duration-200"
              aria-label="Delete Raw"
              // variant="contained"
              // sx={{color: "#334155",}}
              color="inherit"
            >
              {raw.pinned === true?"Unpin" : raw.pinned === false ? "Pin" :""}
            </Button>
          )}
            </div>
          )}
    </div>
  );
}
