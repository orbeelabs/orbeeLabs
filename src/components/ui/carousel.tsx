"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselProps = {
  orientation?: "horizontal" | "vertical"
  autoPlay?: boolean
  interval?: number
  className?: string
  children: React.ReactNode
}

type CarouselContextProps = {
  currentIndex: number
  totalItems: number
  goToSlide: (index: number) => void
  nextSlide: () => void
  prevSlide: () => void
  canGoPrev: boolean
  canGoNext: boolean
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation: _orientation = "horizontal",
      autoPlay = false,
      interval = 5000,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [totalItems, setTotalItems] = React.useState(0)

    const childrenArray = React.Children.toArray(children)
    const itemCount = childrenArray.length

    React.useEffect(() => {
      setTotalItems(itemCount)
    }, [itemCount])

    const goToSlide = React.useCallback((index: number) => {
      if (index >= 0 && index < itemCount) {
        setCurrentIndex(index)
      }
    }, [itemCount])

    const nextSlide = React.useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount)
    }, [itemCount])

    const prevSlide = React.useCallback(() => {
      setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
    }, [itemCount])

    React.useEffect(() => {
      if (!autoPlay || itemCount <= 1) return

      const timer = setInterval(() => {
        nextSlide()
      }, interval)

      return () => clearInterval(timer)
    }, [autoPlay, interval, nextSlide, itemCount])

    const canGoPrev = currentIndex > 0
    const canGoNext = currentIndex < itemCount - 1

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          prevSlide()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          nextSlide()
        }
      },
      [prevSlide, nextSlide]
    )

    return (
      <CarouselContext.Provider
        value={{
          currentIndex,
          totalItems,
          goToSlide,
          nextSlide,
          prevSlide,
          canGoPrev,
          canGoNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative w-full", className)}
          role="region"
          aria-label="Carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className: _className, ...props }, ref) => {
  const { currentIndex } = useCarousel()

  return (
    <div ref={ref} className="overflow-hidden" {...props}>
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {React.Children.map(
          (props.children as React.ReactNode) || [],
          (child, index) => (
            <div key={index} className="min-w-full shrink-0">
              {child}
            </div>
          )
        )}
      </div>
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("w-full", className)}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { prevSlide, canGoPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full",
        className
      )}
      disabled={!canGoPrev}
      onClick={prevSlide}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { nextSlide, canGoNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full",
        className
      )}
      disabled={!canGoNext}
      onClick={nextSlide}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

