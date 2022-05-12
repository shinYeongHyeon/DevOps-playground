# 소규모 아키텍쳐 구성

## Instance
- EC2 (ubuntu 22)

## Repository
- RDS (postgresql)

### 단순배포
- instance 안에서 `ssh-keygen -t rsa`
- `cat ~/.ssh/id_rsa.pub` 를 복사해서 Git Repository `Settings > Deploy keys`에 추가
- 다시 instance 안에서 `ssh-keygen -t rsa -C "{깃헙이메일주소}"`
- overwrite 하면되고, `cat ~/.ssh/id_rsa.pub` 복사해서 깃헙 계정 프로필에 SSH 키로 등록
- 그러고 나서 `git clone {레포주소}`
- START !