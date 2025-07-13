import React, { createContext, useContext, useRef, useState } from "react";
import { View, Pressable, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Svg, { Path } from "react-native-svg"; // Import SVG components

// Custom ArrowLeft Icon using react-native-svg
const ArrowLeft = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color} // Use stroke to set the color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Custom ArrowRight Icon using react-native-svg
const ArrowRight = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18l6-6-6-6"
      stroke={color} // Use stroke to set the color
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface CarouselContextType {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

interface CarouselProps {
  data: any[];
  renderItem: ({ item, index }: { item: any; index: number }) => JSX.Element;
}

export function CustomCarousel({ data, renderItem }: CarouselProps) {
  const width = Dimensions.get("window").width;
  const carouselRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = () => {
    if (carouselRef.current && currentIndex > 0) {
      carouselRef.current.prev();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const scrollNext = () => {
    if (carouselRef.current && currentIndex < data.length - 1) {
      carouselRef.current.next();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <CarouselContext.Provider
      value={{
        scrollPrev,
        scrollNext,
        canScrollPrev: currentIndex > 0,
        canScrollNext: currentIndex < data.length - 1,
      }}
    >
      <View style={styles.container}>
        <Carousel
          ref={carouselRef}
          loop={false}
          width={width}
          height={200} // Adjust height as needed
          data={data}
          renderItem={renderItem}
          onSnapToItem={(index) => setCurrentIndex(index)}
        />
        <CarouselPrevious />
        <CarouselNext />
      </View>
    </CarouselContext.Provider>
  );
}

export function CarouselPrevious() {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Pressable
      onPress={scrollPrev}
      disabled={!canScrollPrev}
      style={[styles.button, { left: 10, opacity: canScrollPrev ? 1 : 0.5 }]}
    >
      <ArrowLeft size={20} color="#FFFFFF" /> {/* Custom ArrowLeft Icon */}
    </Pressable>
  );
}

export function CarouselNext() {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Pressable
      onPress={scrollNext}
      disabled={!canScrollNext}
      style={[styles.button, { right: 10, opacity: canScrollNext ? 1 : 0.5 }]}
    >
      <ArrowRight size={20} color="#FFFFFF" /> {/* Custom ArrowRight Icon */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    top: "50%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
  },
});