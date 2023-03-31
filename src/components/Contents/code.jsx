import React, { useState, useRef, useCallback, useEffect } from "react";

function LargeList({ data }) {
   const [startIndex, setStartIndex] = useState(0);
   const [endIndex, setEndIndex] = useState(10);
   const [itemHeight, setItemHeight] = useState(50);
   const listRef = useRef(null);
   const itemRefs = useRef([]);

   const handleScroll = useCallback(() => {
      const { scrollTop, offsetHeight } = listRef.current;
      const newStartIndex = Math.floor(scrollTop / itemHeight);
      const newEndIndex = Math.min(
         newStartIndex + Math.ceil(offsetHeight / itemHeight),
         data.length
      );

      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
   }, [data.length, itemHeight]);

   useEffect(() => {
      const newRefs = Array(data.length)
         .fill()
         .map((_, i) => itemRefs.current[i] || React.createRef());
      itemRefs.current = newRefs;
   }, [data.length]);

   useEffect(() => {
      if (itemRefs.current.length > 0) {
         const newHeight =
            itemRefs.current[0].current.getBoundingClientRect().height;
         if (newHeight !== itemHeight) {
            setItemHeight(newHeight);
         }
      }
   }, [itemHeight]);

   return (
      <div
         style={{ height: "200px", overflowY: "scroll" }}
         ref={listRef}
         onScroll={handleScroll}
      >
         <div style={{ height: `${data.length * itemHeight}px` }}>
            {data.slice(startIndex, endIndex).map((item, index) => (
               <div key={index} ref={itemRefs.current[index]} style={{ height: "50px" }}>
                  {item}
               </div>
            ))}
         </div>
      </div>
   );
}
