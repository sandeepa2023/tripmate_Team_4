export default function DestinationGallery({ images, name }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${name} ${index + 1}`}
            className="rounded-lg w-full h-48 object-cover"
          />
        ))}
      </div>
    </div>
  );
}