import { Module } from '@nestjs/common'
import { ParseUrlModule } from './parse_url/parse_url.module'

@Module({
	imports: [ParseUrlModule],
})
export class AppModule { }
