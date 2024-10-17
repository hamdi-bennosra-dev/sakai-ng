export abstract class FileUpload {
    file: File;
    imageSrc: string | ArrayBuffer | null = null;

    protected onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files.length) {
            this.file = input.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                this.imageSrc = reader.result;
            };

            reader.readAsDataURL(this.file); // Read the file and set it as imageSrc
        }
    }
}
