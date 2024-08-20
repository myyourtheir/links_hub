import { Body, Controller, Get, Post } from '@nestjs/common'
import { ParseUrlDto } from './parse_url.dto/dto'
import { ParseUrlService } from './parse_url.service'

@Controller()
export class ParseUrlController {
	constructor(private readonly service: ParseUrlService) { }
	@Post('parse_url')
	parseUrl(@Body() body: ParseUrlDto) {
		return this.service.parseUrl(body)
	}
}
