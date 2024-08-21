import { Injectable } from '@nestjs/common'
import { ParseUrlDto } from '../parse_url.dto/dto'
import parseOther from './parseOther'
import { parseWbProduct } from './wb.product'
import { parseYaProduct } from './ya.product'
import { parseOzonProduct } from './ozon.product'
import { parseYoutubeVideo } from './youtube.video'
@Injectable()
export class ParseUrlService {
	parseUrl(body: ParseUrlDto) {
		switch (true) {
			case body.url.includes('www.wildberries.ru/catalog'):
				return parseWbProduct(body.url)
			case body.url.includes('market.yandex.ru/product'):
				return parseYaProduct(body.url)
			case body.url.includes('www.ozon.ru/product'):
				return parseOzonProduct(body.url)
			case body.url.includes('www.youtube.com/watch'):
				return parseYoutubeVideo(body.url)
			default:
				return parseOther(body.url)
		}
	}
}
