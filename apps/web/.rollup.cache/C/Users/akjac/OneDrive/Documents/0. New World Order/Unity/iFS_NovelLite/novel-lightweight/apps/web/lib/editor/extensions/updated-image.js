import Image from "@tiptap/extension-image";
const UpdatedImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
            },
            height: {
                default: null,
            },
        };
    },
});
export default UpdatedImage;
//# sourceMappingURL=updated-image.js.map