# 네트워크

## 네트워크의 기본

### IP
- 컴퓨터 사이에 통신을 하려면 컴퓨터의 위치값을 알아야 한다.
    - 각 컴퓨터의 위치값을 IP 주소라고 한다. (IPv4)
- IP 는 8비트 4개의 옥텟(octet)으로 이루어진다. = 32Bit
    - 172.16.254.1
        - 10101100.00010000.11111110.00000001
    - 앞에서부터 1옥텟 (172 부분) 이다.
    - 그러다 보니 세상 에 존재할 수 있는 IPv4 의 갯수는 2^32개 이다. (약 42억)
- IPv4 의 클래스
    - A, B, C 클래스 (D/E 도 있긴 함)
    - A 클래스
        - 첫 번째 옥텟의 맨 앞자리가 0
        - 이 조건을 만족하는 IP 를 A 클래스
        - 10진수로는 1부터 127
    - B 클래스
        - 첫 번째 옥텟의 맨 앞자리가 1, 그 다음이 0
        - 10진수로는 128부터 191
    - C 클래스
        - 첫 번째 옥텟의 맨 앞자리가 1, 그 다음이 1, 그 다음이 0
        - 10진수로는 192부터 223
- 네트워크 비트와 호스트 비트
    - 네트워크 : 첫 번째 옥텟에서 식별자를 제외한 부분
    - 호스트 : 네트워크 옥텟을 제외한 나머지 옥텟들
        - 특정 네트워크 안에 종속
    - 식별자란 ?
        - 클래스를 구분하는 값, 예를 들어 A 는 첫 자리0인 경우, B 는 첫~두자리가 10 인경우
        - A 클래스의 네트워크 비트는 첫번째 옥텟까지
            - 1개의 네트워크가 2^24 개의 IP 를 보유(호스트) (두,세,네 번째 옥텟)
            - 이런 네트워크가 2^7 개 만큼 있음
        - B 클래스의 네트워크 비트는 두번째 옥텟까지
            - 1개의 네트워크가 2^16 개의 IP 를 보유(호스트) (세,네 번째 옥텟)
            - 이런 네트워크가 2^14 개 만큼 있음 (2^(16-2))
        - C 클래스의 네트워크 비트는 세번째 옥텟까지
            - 1개의 네트워크가 2^8 개의 IP 를 보유(호스트) (네번째 옥텟)
            - 이런 네트워크가 2^21개 만큼 있음 (2^(24-3))
    - 211.11.124.2 분석
        - C 클래스
        - 211.11.124 네트워크 안에 들어가 있음
        - 호스트는 네번째 옥텟
            - 범위는 211.11.124.0 ~ 211.11.124.255

### 서브넷 (CIDR) -> 나눠쓰자..!
- Classless Inter-Domain Routing
- 서브네트워크
- 211.11.124 네트워크라 했을 때, 서브넷을 두개로 구분해본다고 해보자
    - 0~127 과 128~255 로 나눠지고 각각 Subnet A, B라 명명
    - 이렇다고 했을 때 이진수로 비교해보면 각 Subnet 은 첫 번째 자리를 제외하고만 변화된다.
        - 0~127 (00000000 ~ 01111111) / 128~255 (10000000 ~ 11111111)
    - CIDR 표기
        - Subnet A 에 속한 IP 대역 표기 : 211.12.124.0/25
        - Subnet B 에 속한 IP 대역 표기 : 211.11.124.128/25
        - / 전에는 대역의 첫번째 IP
        - / 후는 고정된 비트의 갯수
            - 예제의 경우 8+8+8+1 = 25

## VPC (Virtual Private Cloud)

Amazon VPC 를 이용하면 사용자가 정의한 **가상 네트워크**로 AWS 리소스를 시작할 수 있다.  
*기존 네트워크와 (개념적으로) 매우 유사*, (이하 VPC = AWS VPC)

### VPC 의 특징
1. 계정 생성 시 default 로 VPC 를 만들어 줌 
2. EC2, RDS, S3 등의 서비스 활용 가능
3. 서브넷 구성
4. 보안 설정 (IP block, Inbound/Outbound 설정)
5. VPC Peering (VPC 간의 연결)
6. IP 대역 지정 가능
7. VPC 는 하나의 Region 에만 속할 수 있음

### VPC 의 기본 컨셉

![VPC](https://user-images.githubusercontent.com/74130738/163822417-467b1065-f292-4f15-9607-19c5c2001ef3.png)

### VPC 의 구성요소
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
