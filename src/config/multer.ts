import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller('upload')
export class UploadController {
    @Post('files')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files);
        return {
            message: 'Arquivos enviados com sucesso!',
            files,
        };
    }
}