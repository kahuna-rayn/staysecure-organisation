interface MediaUploadProps {
    mediaType?: string;
    mediaUrl?: string;
    mediaAlt?: string;
    onMediaChange: (media: {
        type: string;
        url: string;
        alt: string;
    } | null) => void;
}
export declare const MediaUpload: ({ mediaType, mediaUrl, mediaAlt, onMediaChange }: MediaUploadProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MediaUpload.d.ts.map