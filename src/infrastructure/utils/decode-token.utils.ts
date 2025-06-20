import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'

export interface DecodedToken {
  id: number
  name: string
  email: string
  exp: number
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): DecodedToken | null => {
    const request = ctx.switchToHttp().getRequest()

    const authHeader =
      request.header['authorization'] || request.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or malformed.',
      )
    }

    const token = authHeader.substring(7)

    try {
      const decoded: DecodedToken = JSON.parse(
        Buffer.from(token, 'base64').toString(),
      )

      const now = Date.now()
      if (decoded.exp && now > decoded.exp) {
        throw new UnauthorizedException('Token expired.')
      }

      return decoded
    } catch (error) {
      throw new UnauthorizedException('Invalid token.')
    }
  },
)
