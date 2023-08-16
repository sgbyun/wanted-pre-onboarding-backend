<h1 align="center"> wanted-pre-onboarding-backend </h1>

> 지원자 이름 :변상기

<h2> :book: 애플리케이션 실행 방법</h2>

<p>루트 디렉토리에 환경변수 파일(.env) 작성</p>
   <pre><code>
    SERVER_PORT = 사용할 서버 포트번호
    JWT_SECRET_KEY = 임의의 jwt secret key
    DB_HOST= 사용할 db의 host
    DB_USER= 사용할 db의 user명
    DB_PASSWORD= 사용할 db의 password
    DB_DATABASE= 사용할 db명
    DATABASE_URL='mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:3306/${DB_DATABASE}?schema=public'
    </code></pre>

<p>BackEnd 서버 실행</p>
   <pre><code>
    npm install
    npx prisma db push
    npm start
    </code></pre>

**<p>[엔드포인트 호출방법 (Postman) ](https://documenter.getpostman.com/view/26929921/2s9Xy6rVbV)</p>**

<h2> :pencil: DB 테이블 구조 </h2>

<img src="https://github.com/sgbyun/wanted-pre-onboarding-backend/assets/79850241/0c0269a4-3fb0-408a-ba84-b6fc83e76d16" width="750px">

<h2> :floppy_disk: API 동작 데모 영상</h2>

**[링크](https://drive.google.com/file/d/1pgm_E4D9btd5TljkQnoTg-fRGDAGSkpb/view?usp=sharing)**

<h2> :pencil: 구현 방법 및 이유에 대한 간략한 설명 </h2>

- **과제 1. 사용자 회원가입 엔드포인트**
  
    1. 프론트에서 이메일과 비밀번호를 req.body에 담아 POST 요청으로 받습니다.
    2. 프론트에서 받은 이메일과 비밀번호의 유효성을 검증합니다.  
       - 유효성 검사가 로그인에서도 사용되므로 관리의 편의를 위해 미들웨어로 작성하였습니다.
    3. 비밀번호를 bcrypt를 이용해 암호화 한 후, DB에 이메일과 비밀번호를 저장합니다.

- **과제 2. 사용자 로그인 엔드포인트**
  
    1. 프론트에서 이메일과 비밀번호를 req.body에 담아 POST 요청으로 받습니다.
    2. 프론트에서 받은 이메일과 비밀번호의 유효성을 검증합니다.  
    3. 받은 이메일로 DB에 있는 유저 정보 조회 후, 비밀번호를 비교합니다.
    4. 비밀번호가 일치하면, 로그인 토큰을 생성해 반환합니다.
    
- **과제 3. 새로운 게시글을 생성하는 엔드포인트**

    1. 프론트에서 헤더에 로그인 토큰, req.body에 게시글 제목과 내용을 담아 POST 요청으로 받습니다.
    2. 로그인 미들웨어에서 프론트에서 받은 토큰에서 이메일을 추출해 req.user에 담아준 후 router로 전송합니다.
       - 토큰이 없으면 게시글 작성을 제한합니다. 게시글 수정 및 삭제에서도 사용되므로 미들웨어로 작성하였습니다.
    3. 프론트에서 받은 유저의 이메일 및 게시글 제목, 내용을 DB에 저장합니다.
       
- **과제 4. 게시글 목록을 조회하는 엔드포인트**

    1. 프론트에서 Query Parameter로 take 및 page를 포함해 GET 요청으로 받습니다.
       - GET 요청에서 body를 포함하는건 불필요하다고 판단해 Query Parameter로 받았습니다.
       - take는 페이지당 게시글 수 , page는 현재 페이지 입니다.
       - 요청에 Query Parameter가 포함되어있지 않다면 기본값으로 각각 10, 1을 지정해줍니다.
    3. DB에서 전체 게시글 수를 불러옵니다.
    4. 프론트에서 받은 take 및 page 값을 이용해 해당되는 게시글 목록을 불러옵니다.
    5. 전체 게시글 수 , 현재 페이지, 총 페이지 수, 불러온 게시글 목록을 반환합니다.
       
- **과제 5. 특정 게시글을 조회하는 엔드포인트**

    1. 프론트에서 Path Variable로 게시글 ID를 포함해 GET 요청으로 받습니다.
       - 필요한 인자가 1개고, 정수이기 때문에 Path Variable로 받았습니다.
    2. id를 Primary Key로 가진 게시글을 반환합니다.
       
- **과제 6. 특정 게시글을 수정하는 엔드포인트**
  
    1. 프론트에서 헤더에 로그인 토큰, req.body에 게시글 ID, 게시글 제목 및 내용을 담아 PATCH 요청으로 받습니다.
       - 제목 과 내용 중 1가지만 받아오더라도 수정이 가능하므로 요청 메서드를 PATCH로 받았습니다.
    2. 받은 게시글 ID로 해당 게시글을 불러와 로그인 토큰의 email과 비교합니다.
       - 게시글의 작성자 email과 일치하지 않으면 오류를 반환합니다.
    3. 게시글 제목 혹은 내용을 DB에 갱신합니다.
       
- **과제 7. 특정 게시글을 삭제하는 엔드포인트**
 
    1. 프론트에서 헤더에 로그인 토큰, Path Variable로 게시글 ID를 포함해 DELETE 요청으로 받습니다.
    2. 받은 게시글 ID로 해당 게시글을 불러와 로그인 토큰의 email과 비교합니다.
       - 게시글의 작성자 email과 일치하지 않으면 오류를 반환합니다.
    3. DB에 있는 게시글을 삭제합니다.

<h2> :book: API 명세 </h2>

**<p>[API 명세 링크 (Postman) ](https://documenter.getpostman.com/view/26929921/2s9Xy6rVbV)</p>**
- 엔드포인트 호출방법 링크와 동일합니다.