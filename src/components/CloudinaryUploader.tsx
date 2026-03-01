// import { useState } from 'react';
// import { Upload, X, Loader2, Image as ImageIcon, CheckCircle } from 'lucide-react';
// import { toast } from 'sonner';

// // Cloudinary configuration
// const CLOUD_NAME = 'djqfyb7si';
// const UPLOAD_PRESET = 'pg-listings'; // You need to create this in Cloudinary dashboard

// interface CloudinaryImageUploadProps {
//   onUpload: (url: string) => void;
//   onRemove?: () => void;
//   currentImage?: string;
//   folder?: string;
//   className?: string;
// }

// export const CloudinaryImageUpload = ({ 
//   onUpload, 
//   onRemove, 
//   currentImage, 
//   folder = 'pg-listings',
//   className = ''
// }: CloudinaryImageUploadProps) => {
//   const [uploading, setUploading] = useState(false);
//   const [preview, setPreview] = useState<string | null>(currentImage || null);

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please select an image file');
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('Image size should be less than 5MB');
//       return;
//     }

//     // Show local preview
//     const localPreview = URL.createObjectURL(file);
//     setPreview(localPreview);
//     setUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', UPLOAD_PRESET);
//       formData.append('folder', folder);
      
//       // REMOVED: transformation parameter - not allowed with unsigned uploads

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         const imageUrl = data.secure_url;
//         onUpload(imageUrl);
//         setPreview(imageUrl);
//         toast.success('Image uploaded successfully!');
//       } else {
//         throw new Error(data.error?.message || 'Upload failed');
//       }
//     } catch (error: any) {
//       console.error('Upload error:', error);
//       toast.error(`Upload failed: ${error.message}`);
//       setPreview(currentImage || null);
//     } finally {
//       setUploading(false);
//       URL.revokeObjectURL(localPreview);
//     }
//   };

//   const handleRemove = () => {
//     setPreview(null);
//     if (onRemove) {
//       onRemove();
//     }
//   };

//   return (
//     <div className={`relative ${className}`}>
//       {preview ? (
//         <div className="relative group">
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
//           />
//           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
//             <label className="cursor-pointer p-2 bg-white rounded-full hover:bg-gray-100">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileSelect}
//                 className="hidden"
//                 disabled={uploading}
//               />
//               <Upload className="h-4 w-4 text-gray-700" />
//             </label>
//             <button
//               onClick={handleRemove}
//               className="p-2 bg-red-500 rounded-full hover:bg-red-600"
//             >
//               <X className="h-4 w-4 text-white" />
//             </button>
//           </div>
//           {uploading && (
//             <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
//               <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
//             </div>
//           )}
//         </div>
//       ) : (
//         <label className="block cursor-pointer">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileSelect}
//             className="hidden"
//             disabled={uploading}
//           />
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
//             {uploading ? (
//               <div className="flex flex-col items-center">
//                 <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
//                 <span className="text-sm text-gray-600">Uploading...</span>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center">
//                 <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
//                 <span className="text-sm text-gray-600">Click to upload image</span>
//                 <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
//               </div>
//             )}
//           </div>
//         </label>
//       )}
//     </div>
//   );
// };

// interface CloudinaryGalleryUploaderProps {
//   images: string[];
//   onImagesChange: (images: string[]) => void;
//   maxImages?: number;
//   folder?: string;
// }

// export const CloudinaryGalleryUploader = ({
//   images,
//   onImagesChange,
//   maxImages = 10,
//   folder = 'pg-listings/gallery'
// }: CloudinaryGalleryUploaderProps) => {
//   const [uploading, setUploading] = useState(false);

//   const handleGalleryUpload = async (files: FileList) => {
//     const fileArray = Array.from(files);
    
//     if (images.length + fileArray.length > maxImages) {
//       toast.error(`You can only upload up to ${maxImages} images`);
//       return;
//     }

//     setUploading(true);
//     const uploadedUrls: string[] = [];

//     try {
//       for (const file of fileArray) {
//         // Validate each file
//         if (!file.type.startsWith('image/')) {
//           toast.error(`${file.name} is not an image`);
//           continue;
//         }

//         if (file.size > 5 * 1024 * 1024) {
//           toast.error(`${file.name} is too large (max 5MB)`);
//           continue;
//         }

//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', UPLOAD_PRESET);
//         formData.append('folder', folder);
        
//         // REMOVED: transformation parameter - not allowed with unsigned uploads

//         const response = await fetch(
//           `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//           {
//             method: 'POST',
//             body: formData,
//           }
//         );

//         const data = await response.json();

//         if (response.ok) {
//           uploadedUrls.push(data.secure_url);
//         } else {
//           throw new Error(data.error?.message || 'Upload failed');
//         }
//       }

//       if (uploadedUrls.length > 0) {
//         onImagesChange([...images, ...uploadedUrls]);
//         toast.success(`${uploadedUrls.length} images uploaded successfully!`);
//       }
//     } catch (error: any) {
//       console.error('Gallery upload error:', error);
//       toast.error(`Upload failed: ${error.message}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const removeImage = (index: number) => {
//     const newImages = images.filter((_, i) => i !== index);
//     onImagesChange(newImages);
//     toast.info('Image removed');
//   };

//   return (
//     <div className="space-y-4">
//       {/* Upload Area */}
//       <label className="block cursor-pointer">
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)}
//           className="hidden"
//           disabled={uploading || images.length >= maxImages}
//         />
//         <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
//           {uploading ? (
//             <div className="flex flex-col items-center">
//               <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
//               <span className="text-sm text-gray-600">Uploading images...</span>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center">
//               <Upload className="h-8 w-8 text-gray-400 mb-2" />
//               <span className="text-sm font-medium text-gray-700">
//                 Click to upload gallery images
//               </span>
//               <span className="text-xs text-gray-500 mt-1">
//                 PNG, JPG up to 5MB each (max {maxImages} images)
//               </span>
//               {images.length > 0 && (
//                 <span className="text-xs text-blue-600 mt-2">
//                   {images.length}/{maxImages} images uploaded
//                 </span>
//               )}
//             </div>
//           )}
//         </div>
//       </label>

//       {/* Gallery Preview */}
//       {images.length > 0 && (
//         <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
//           {images.map((url, index) => (
//             <div key={index} className="relative group">
//               <img
//                 src={url}
//                 alt={`Gallery ${index + 1}`}
//                 className="w-full h-24 object-cover rounded-lg border"
//               />
//               <button
//                 onClick={() => removeImage(index)}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 <X className="h-3 w-3" />
//               </button>
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
//                 <CheckCircle className="h-5 w-5 text-green-400" />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };