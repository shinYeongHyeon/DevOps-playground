# Medium Architecture

## 스터디 스펙 (코딩 제외, AWS만 진행)
- Docker
- AWS ECR
- AWS Fargate
- AWS KMS
- AWS CodeCommit
- AWS CodeDeploy

## AWS ECR
- Elastic Container Registry
  - 도커 Registry 와 유사한 기능을 AWS 에서 제공
  - 이미지를 올리는 곳

## AWS ECS
- Elastic Container Service
- 최근에 ECS 안에 ECR 이 포함 됨
- 컨테이너/이미지를 저장하고 저장된 이미지를 통해 여러 작업 (배포 포함)
- 예전 방식
- ECS 에서 레포지토리를 생성하면 URI 가 하나 생김
  - 그리고 해당 레포지토리에 docker image 이름으로 태그를 걸어줌
  - `docker tag {imagename} {repositoryURI}`
  - 태깅된 것을 푸쉬 `docker push {repositoryURI}`

## AWS Fargate
- ECR 까지 올리고 나서 Fargate 를 이용
- Fargate 를 이용하면 ECS 와 EC2 에 배포까지 되는 것과 동일

