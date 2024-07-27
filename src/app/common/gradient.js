import { cn } from "../utils/cn.js"

export default function Gradient({ className }) {
  return <div 
    className={cn('bg-gradient-to-b from-primary-600 to-primary-400', className)}
  />
}

