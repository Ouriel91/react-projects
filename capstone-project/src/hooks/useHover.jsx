import {useState, useEffect, useRef} from "react"

function useHover() {
    const [hovered, setHovered] = useState(false)
    const ref = useRef(null)
    
    function enter() {
        setHovered(true)
    }
    
    function leave() {
        setHovered(false)
    }
    
    useEffect(() => {

        const refUse = ref.current

        refUse.addEventListener("mouseenter", enter)
        refUse.addEventListener("mouseleave", leave)
        
        return () => {    
            refUse.removeEventListener("mouseenter", enter)
            refUse.removeEventListener("mouseleave", leave)
        }
    }, [])
    
    return [hovered, ref]
}

export default useHover