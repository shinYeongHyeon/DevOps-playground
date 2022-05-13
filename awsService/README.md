# AWS SERVICE

## AWS 주요 컴퓨팅 서비스

### AWS EC2 (Elastic Compute Cloud)
- 사양과 크기를 조절할 수 있는 컴퓨팅 서비스

### AWS Lightsail
- 가상화 프라이빗 서버

### AWS Auto Scaling
- 서버의 특정 조건에 따라 서버를 추가/삭제할 수 있게 하는 서비스

### AWS Workspace
- 사내 pc를 가상화로 구성하여, 문서를 개인 pc에 보관하는 것이 아니라 서버에서 보관하게 하는 서비스 

## AWS 주요 네트워킹 서비스

### AWS Route 53
- DNS (Domain Name System) 서비스

### AWS VPC
- 가상 네트워크를 클라우트 내에 생성/구성

### AWS Direct Connect
- On-premise 인프라와 aws 를 연결하는 서비스
- On-premise: 노트북/데스크탑과 같은 현실 기계라고 생각

### AWS CLB
- Class Load-balancing
  - L4 로드밸런싱 (OSI7계층에서 4계층에서 전환, 즉 IP 만 보다)
- 옛날의 로드 밸런싱
- 장점
  - 빠르고 싸고, 단순하다
- 단점
  - Micro Service 에 불리

### ALB
- L7 로드 밸런싱 (7계층에서 전환)
- 장점
  - 스마트, Micro Service 에 유리
- 단점
  - 데이터를 보고 전환하기에 속도 이슈
  - 비용 이슈

### AWS ELB
- 부하 분산(로드 밸런싱) 서비스

## AWS 주요 스토리지/데이터베이스 서비스

### AWS S3
### AWS RDS
### AWS DynamoDB
### AWS ElasticCache
- In-memory 기반의 cache 서비스

## AWS 주요 데이터 분석&AI 서비스

### AWS Redshift
- 데이터 분석에 특화된 스토리지 시스템

### AWS EMR
- 대량의 데이터를 효율적으로 가공 & 처리

### AWS sagemaker
- 머신 러닝 & 데이터 분석을 위한 클라우드 환경 제공
