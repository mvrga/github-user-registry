import { Module } from '@nestjs/common';  
import { JwtModule } from '@nestjs/jwt';  
import { PassportModule } from '@nestjs/passport';  
import { AuthService } from './auth.service';  

@Module({  
  imports: [  
    PassportModule,  
    JwtModule.register({  
      secret: 'SUA_CHAVE_SECRETA', // Troque por uma variável de ambiente!  
      signOptions: { expiresIn: '1h' },  
    }),  
  ],  
  providers: [AuthService],  
  controllers: [],  
})  
export class AuthModule {}  
