import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';
import { GithubUser } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Busca usuário no GitHub e salva/atualiza no banco
   * @param username Nome de usuário do GitHub
   */
  async fetchAndSaveUser(username: string): Promise<GithubUser> {
    try {
      // 1. Busca no GitHub
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      // 2. Salva ou atualiza no banco
      return this.prisma.githubUser.upsert({
        where: { githubId: data.id },
        update: {
          login: data.login,
          name: data.name,
          avatarUrl: data.avatar_url,
          htmlUrl: data.html_url,
        },
        create: {
          githubId: data.id,
          login: data.login,
          name: data.name,
          avatarUrl: data.avatar_url,
          htmlUrl: data.html_url,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        `Usuário '${username}' não encontrado no GitHub`,
      );
    }
  }

  /**
   * Lista todos os usuários do banco
   */
  async getAllUsers(): Promise<GithubUser[]> {
    return this.prisma.githubUser.findMany();
  }

  /**
   * Busca usuário por ID
   * @param id ID do usuário no banco
   */
  async getUserById(id: number): Promise<GithubUser | null> {
    return this.prisma.githubUser.findUnique({
      where: { id },
    });
  }

  /**
   * Busca usuário por username (para autenticação)
   * @param login Nome de usuário no GitHub
   */
  async findByUsername(login: string): Promise<GithubUser | null> {
    return this.prisma.githubUser.findUnique({
      where: { login },
    });
  }
}
