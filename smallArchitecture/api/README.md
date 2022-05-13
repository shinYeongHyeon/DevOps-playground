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

### ALB 연결
- 로드밸런싱 > 대상그룹 생성
  - Protocol, Port 는 트래픽이 왔을 때 어느 포트로 보낼 것이냐를 결정
  - 현재 프로젝트 기준 `3000`
- Health check
  - 서버가 다운됐는지를 확인 해주는 아이
  - 현재 프로젝트 기준 `/orders`
- 만들어진 대상그룹과 로드밸런서를 연결
  - Application Load Balancer
  - 리스너
    - 설정한 포트로 들어온것을 대상그룹으로 이동시킨다.

### ALB Rule
- 특정 규칙을 이용하여 특정 대상그룹으로 보내버리기
  - e.g. `/odres` 로 들어온건 대상그룹 1, `/delivery` 는 대상그룹 2

### Sticky Session
- LB를 이용하면 세션사용이 어렵다. (너무 당연한 얘기)
- 세션값을 인스턴스가 아니라 밸런싱에 저장해서, 세션이 있는 특정 instance 를 보내자.
