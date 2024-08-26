import { Controller, Get, Param } from '@nestjs/common'
import { SelectorsDto } from './selectors.dto/dto'
import { SelectorsService } from './selectors.service'

@Controller('selectors')
export class SelectorsController {
	constructor(private readonly service: SelectorsService) { }
	@Get(':site')
	getSelectors(@Param() params: any): SelectorsDto {
		return this.service.getSelectors(params.site)
	}
}

