<CardsContainer>
        {/* Tarjeta 1 */}
        <StyledCard>
   
        <CardImage src={imagecar} alt="imagecar" className="img-fluid" />

          <Line />
          <CardBody>
            <CardTitle>Servicio Social</CardTitle>
            <CardText>
              Si estás listo para marcar la diferencia a través del servicio social, ¡Únete a nosotros!
            </CardText>
            <StyledButton variant="primary" onClick={() => { handleSelect(1); }}>Seleccionar</StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 2 */}
        <StyledCard>
          <CardImage src={imagecar2} alt="imagecar" className="img-fluid" />
          <Line />
          <CardBody>
            <CardTitle>Practicas Profesionales</CardTitle>
            <CardText>
              Explora nuestras prácticas profesionales en el gobierno y da forma a tu futuro. Haz clic abajo para empezar.
            </CardText>
            <StyledButton variant="primary" onClick={() => { handleSelect(2); }}>Seleccionar</StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 3 */}
        <StyledCard>
          <CardImage src={imagecar3} alt="imagecar" className="img-fluid" />
          <Line />
          <CardBody>
            <CardTitle>Estancias</CardTitle>
            <CardText>
              Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
            </CardText>
            <StyledButton variant="primary" onClick={() => { handleSelect(3); }}>Seleccionar</StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 4 */}
        <StyledCard>
          <CardImage src={imagecar4} alt="imagecar" className="img-fluid" />
          <Line />
          <CardBody>
            <CardTitle>Estadías</CardTitle>
            <CardText>
              Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
            </CardText>
            <StyledButton variant="primary" onClick={() => { handleSelect(4); }}>Seleccionar</StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 5 */}
        <StyledCard>
          <CardImage src={imagecar5} alt="imagecar" className="img-fluid" />
          <Line />
          <CardBody>
            <CardTitle>Modelo Dual</CardTitle>
            <CardText>
              Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
            </CardText>
            <StyledButton variant="primary" onClick={() => { handleSelect(5); }}>Seleccionar</StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 6 */}
        <StyledCard>
          <CardImage src={imagecar6} alt="imagecar" className="img-fluid" />
          <Line />
          <CardBody>
            <CardTitle>Residencia Profesional</CardTitle>
            <CardText>
              Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
            </CardText>
            <StyledButton variant="primary" onClick={() => { handleSelect(6); }}>Seleccionar</StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 7 */}
        <StyledCard>
          <CardImage src={imagecar7} alt="imagecar" className="img-fluid"/>
          <Line />
          <CardBody>
            <CardTitle>Proyecto de Intervención</CardTitle>
            <CardText>
              Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
            </CardText>
            <StyledButton variant="primary" onClick={() => { handleSelect(7); }}>Seleccionar</StyledButton>
          </CardBody>
        </StyledCard>
      </CardsContainer>