FROM mcr.microsoft.com/dotnet/core/aspnet:latest AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:latest AS build
WORKDIR /src
COPY ["backend/Slimbo.csproj", "backend/"]
RUN dotnet restore "backend/Slimbo.csproj"
COPY . .
WORKDIR "/src/backend"
RUN dotnet build "Slimbo.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Slimbo.csproj" -c Release -o /app/publish


FROM node:13.12.0-alpine AS frontend
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
COPY frontend/tsconfig.json ./
COPY frontend/public ./public
COPY frontend/src ./src
RUN npm install --silent
RUN npm run-script build

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN mkdir -p ./wwwroot
COPY --from=frontend /app/build ./wwwroot
ENTRYPOINT ["dotnet", "Slimbo.dll"]
