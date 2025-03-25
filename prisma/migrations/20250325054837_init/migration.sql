-- CreateTable
CREATE TABLE "GithubUser" (
    "id" SERIAL NOT NULL,
    "githubId" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "htmlUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubUser_githubId_key" ON "GithubUser"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "GithubUser_login_key" ON "GithubUser"("login");
