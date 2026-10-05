import Image from "next/image";

export default function DecorativeCar() {
  return (
    <div className="car-wrap reveal-car" aria-hidden="true">
      <div className="car-glow" />
      <Image
        src="/hero-car.jpg"
        alt=""
        width={1248}
        height={832}
        priority
      />
    </div>
  );
}
