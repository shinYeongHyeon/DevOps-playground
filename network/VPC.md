# VPC (Virtual Private Cloud)

Amazon VPC 를 이용하면 사용자가 정의한 **가상 네트워크**로 AWS 리소스를 시작할 수 있다.  
*기존 네트워크와 (개념적으로) 매우 유사*, (이하 VPC = AWS VPC)

## VPC 의 특징
1. 계정 생성 시 default 로 VPC 를 만들어 줌
2. EC2, RDS, S3 등의 서비스 활용 가능
3. 서브넷 구성
4. 보안 설정 (IP block, Inbound/Outbound 설정)
5. VPC Peering (VPC 간의 연결)
6. IP 대역 지정 가능
7. VPC 는 하나의 Region 에만 속할 수 있음

## VPC 의 기본 컨셉

![VPC](https://user-images.githubusercontent.com/74130738/163822417-467b1065-f292-4f15-9607-19c5c2001ef3.png)

## VPC 의 구성요소
1. Availability Zone (AZ)
    1. 하나의 Region 은 2개 이상의 AZ 로 구성
2. Subnet (CIDR)
    - VPC 의 하위 단위 (sub + network)
    - 하나의 AZ 에서만 생성 가능
    - 하나의 AZ 에는 여러개의 subnet 생성 가능
    - Private subnet : 인터넷(외부)에 접근 불가능한 Subnet
    - Public subnet : 인터넷에접근 가능한 Subnet
    - CIDR 블록을 통해 Subnet 을 구분
        - e.g. 1번째 서브넷 211.11.124.0/26, 2번째 서브넷 211.11.124.64/26 ...
3. Internet Gateway (IGW)
    - 인터넷(외부)으로 나가는 **통로**
    - **Private subnet 은 IGW 로 연결되어 있지 않다.**
4. Network Access Control List (NACL) / Security Group (SG)
    - 보안 검문소
    - NACL -> Stateless, SG -> Stateful
        - Stateful 하다 ? (약간, 상태를 저장하고 있다라는 느낌)
            - 만약 내가 inbound 80 은 허용하고, 딱히 outbound 를 설정안했다 하더라도 80포트로 들어오는 요청의 포트가 1025더라도 우리가 응답을 줄 수 있음
            - 반대로 Stateless 일 경우에는 응답을 받을 수 없다. stateless 가 좀더 엄격한 느낌
    - Access Block 은 NACL 에서만 가능
        - 특정 IP 대역의 Inbound 를 막고 싶으면 NACL 을 통해서만 ..!
5. Route Table
    - 트래픽이 어디로 가야 하는지 알려주는 테이블
    - VPC 생성 시 자동으로 만들어 줌
        - 예를 들어, 10.0.0.0/16 (10.0.0.0 ~ 10.0.255.255) 는 Local
        - 나머지는 IGW
        - 하위 테이블 참고
            - Private 에서는 아래 두줄이 없는 것이다..! (IGW 로 가는 길)

| Destination | Target | 
|-------------|--------| 
| 10.0.0.0/16 | Local  | 
| 0.0.0.0/0   | igw-id | 
| ::/0        | igw-id | 

6. Network Address Translation (NAT) instance / NAT Gateway
    - Private 내에서 외부로 가기 위한 방법
    - 왜 필요한가 ?
        - VPC Private 는 외부와 통신이 안되기 때문에, 중요한 데이터를 보관을 하는데 주로 사용 함 (e.g. Database)
        - 그런데, 저 데이터들을 어떻게 활용해야하지 ? 외부 인터넷 연결이 필요한데..?
        - 우회의 방법을 쓴다 .. !
            - Private Subnet 에서 Public Subnet 으로 ..!
        - 이 우회의 방법을 NAT instance 와 NAT Gateway 로 한다 (Public Subnet 내)
            - 실제로는 Private -> Private NACL -> Private Route table -> Public Route Table -> Public NACL -> Public Subnet/NAT instance -> 다시 Public NACL -> ... -> Route
        - NAT gateway vs NAT instance
            - NAT instance 는 단일 Instance (EC2)
            - NAT gateway 는 AWS 에서 제공하는 특화된 서비스
                - : 당연하게 Public Subnet 에 있어야함
        - Bastion Host
            - 이거는 반대 개념
                - 외부에서 Private 으로 가기 위한 방법
            - VPC 밖의 관리자가 Private subnet 의 인스턴스들을 조작/접근하고 싶다
            - Bastion Host 도 Public Subnet 안에 있다
            - 외부에서는 Bastion Host 로 접근하고, Bastion Host 는 Private Subnet 으로 접근 !
7. VPC endpoint
    - VPC 엔드포인트를 통해 IGW, NAT 디바이스, VPN 연결, AWS Direct Connect 연결을 필요로 하지 않고 AWS Private Link 구동 지원 AWS 서비스 및 VPC 엔드포인트 **서비스에 비공개**로 연결할 수 있습니다.
    - VPC 의 인스턴스는 서비스의 리소스와 통신하는데 **퍼블릭 IP 주소를 필요로 하지 않습니다**. VPC 와 기타 서비스 간의 트래픽은 Amazon 네트워크를 벗어나지 않습니다.
    - 즉, AWS의 여러 서비스들과 VPC를 연결 시켜주는 중간 매개체
    - Interface Endpoint : Private ip를 만들어 서비스로 연결해줌 (SQS, SNS, Kinesis ...)
    - Gateway Endpoint : 라우팅 테이블에서 경로의 대상을 지정하여 사용 (S3, Dynamodb ...)
