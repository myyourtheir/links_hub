import { Injectable } from '@nestjs/common'
import { ParseUrlDto } from '../parse_url.dto/dto'
import parseOther from './parseOther'
@Injectable()
export class ParseUrlService {
	parseUrl(body: ParseUrlDto) {
		console.log(body.url)
		switch (body.url) {
			default:
				return parseOther(body.url)
		}
	}
}
