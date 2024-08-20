import { Module } from '@nestjs/common'
import { ParseUrlController } from './parse_utl.controller'
import { ParseUrlService } from './parse_url.service'


@Module({
	imports: [],
	controllers: [ParseUrlController],
	providers: [ParseUrlService],
})
export class ParseUrlModule { }
