import { Injectable } from '@nestjs/common'
import { SelectorsDto } from '../selectors.dto/dto'

@Injectable()
export class SelectorsService {
	getSelectors(site: string): SelectorsDto {
		switch (site) {
			case 'ozon':
				return {
					titleSelector: '.tsHeadline550Medium',
					imageSelector: 'img.mk3_27.b916-a',
					priceSelector: '.o0m_27.mo1_27.o4m_27',
					currencySelector: null
				}
			case 'avito':
				return {
					titleSelector: 'h1[itemprop="name"]',
					imageSelector: 'img',
					priceSelector: 'span[itemprop="price"]',
					currencySelector: null,
				}
		}
	}
}
