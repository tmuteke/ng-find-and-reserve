export class ImagesService {
	private _images: string[] = [
		'../../../global/images/010_300dpi_4200x3150.jpg',
		'../../../global/images/010_300dpi_4200x3150.jpg',
		'../../../global/images/010_300dpi_4200x3150.jpg',
		'../../../global/images/010_300dpi_4200x3150.jpg',
		'../../../global/images/010_300dpi_4200x3150.jpg',
		'../../../global/images/010_300dpi_4200x3150.jpg',
		'../../../global/images/010_300dpi_4200x3150.jpg'
	]


	get images(): string[] {
		return this._images.slice();
	}
}
